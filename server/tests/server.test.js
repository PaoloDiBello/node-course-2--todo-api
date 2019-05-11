
const expect = require('expect')
const request = require('supertest')
const { app } = require('./../server');
const { Todo } = require('./../model/todo');
const { ObjectID } = require('mongodb')
const todos = [
    { _id: new ObjectID(), text: 'Nothing to do' },
    { _id: new ObjectID(), text: 'Do myself a favor and kms' },
    { _id: new ObjectID(), text: 'Shit on the floor', completed: true, completedAt: 333 },
]

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done())
})

describe('POST /todos', () => {


    it('should create a new todo', (done) => {

        var text = 'Text todo test';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done();
                }).catch(e => done(e))
            })

    })

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3)
                    done()
                }).catch(e => done(e))

            })
    })
})

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(3)
            })
            .end(done)
    })
})

describe('GET /todos/:id', () => {

    it('should return todo doc', (done) => {
        const id = (todos[0]._id).toHexString();
        const text = todos[0].text;
        request(app)
            .get(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
            })
            .end(done)
    })

    it('should return 404 if not found ', (done) => {
        const id = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 for non-object ids ', (done) => {
        const id = 'a';
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done)
    })

})

describe('DELETE /todos/:id', () => {

    it('should remove todo', (done) => {
        const id = (todos[0]._id).toHexString();
        const text = todos[0].text;
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text)
            })
            .end((err, res) => {
                // query database using findById
                if (err) {
                    return done(err)
                }
                Todo.findById(id).then((todo) => {
                    expect(todo).toBeFalsy()
                    done();
                }).catch((e) => done(e));
            });

    })


    it('should return 404 if not found', (done) => {
        const id = new ObjectID();
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 if object id is invalid ', (done) => {
        const id = 'a';
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done)
    })

})

describe('PUT /todos/:id', () => {
    const id = (todos[0]._id).toHexString();
    let text = 'This should be the new text';

    it('should update the todo', (done) => {

        request(app)
            .put(`/todos/${id}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done)
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var id = todos[1]._id.toHexString();
        text = 'This should be the new text!!';

        request(app)
            .put(`/todos/${id}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).not.toBeTruthy();
            })
            .end(done);
    });

});


