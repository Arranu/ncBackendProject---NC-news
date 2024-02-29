const seed = require("../db/seeds/seed")
const db = require("../db/connection")
const data = require("../db/data/test-data")
const app = require("../app")
const request =require("supertest")
const apiFile = require("../endpoints.json")
const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
afterAll(() => db.end());
beforeEach(() => seed(data));

describe("task 2 - /api/topics",()=>{
    describe("GET",()=>{
        test("status code:200 and all topics returned",()=>{
            return request(app).get("/api/topics")
            .expect(200).then(({body})=>{
                const desiredObj =   {
                    description: 'The man, the Mitch, the legend',
                    slug: 'mitch'
                }
                expect(body.topics[0]).toMatchObject(desiredObj)    
                expect(body.topics.length).toBe(3)
            })
        })
        test("error:404 when input is invalid",()=>{
            return request(app).get("/api/topic")
            .expect(404).then(({body})=>{   
            expect(body.msg).toBe("Invalid input/endpoint not found")
            })
        })
    })
})
describe("task 3 - /api",()=>{
    test("returns correct info from JSON file",()=>{
        return request(app).get("/api")
        .expect(200).then(({body})=>{
        expect(body.endpoints).toMatchObject(apiFile)
        })
    })
})
describe("task 4/ task 12 - /api/articles/:article_id - UPDATE - involve a comment_count of all comments assocated with article_id",()=>{
    describe("GET",()=>{
        test("status code:200 and correct object returned",()=>{
        return request(app).get("/api/articles/1")
            .expect(200).then(({body})=>{
            expect(body.article).toMatchObject({
                article_id:1,
                votes:0,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: expect.stringMatching(datePattern),
                votes: 100,
                article_img_url:
                    "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                comment_count: "11"
          })
        })
        
    })
        test("status code:200 and correct object returned",()=>{
            return request(app).get("/api/articles/2")
            .expect(200).then(({body})=>{
            expect(body.article).toMatchObject({
                article_id:2,
                votes:0,
                title: "Sony Vaio; or, The Laptop",
                topic: "mitch",
                author: "icellusedkars",
                body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                created_at: expect.stringMatching(datePattern),
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              })
            })
            
        })
        test("error:404 when article_id is valid but not found",()=>{
            return request(app).get("/api/articles/999")
            .expect(404).then(({body})=>{   
                expect(body.msg).toBe('Article does not exist')
                })
        })
        test("error:400 when article_id is invalid",()=>{
            return request(app).get("/api/articles/not-a-value")
            .expect(400).then(({body})=>{
                expect(body.msg).toBe('Bad request')
                })
        })
    })
})
describe("task 5 - /api/articles",()=>{
    describe("GET",()=>{
        test("status code: 200 and returns an array of all articles with correct keys, ordered by date descending",()=>{
            return request(app).get("/api/articles")
            .expect(200).then(({body})=>{
                console.log(body.articles)
                expect(body.articles.length).toBe(13)
                expect(body.articles[0]).toMatchObject({
                    article_id: 3,
                    author: 'icellusedkars',
                    title: 'Eight pug gifs that remind me of mitch',
                    topic: 'mitch',
                    created_at: expect.stringMatching(datePattern),
                    votes: 0,
                    article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
                    comment_count : "2"
                  })
            })
        })

       
    })
})
describe("task 6 - /api/articles/:article_id/comments",()=>{
    describe("GET",()=>{
        test("status code:200 and a full array of article 3 comments",()=>{
        return request(app).get("/api/articles/3/comments")
            .expect(200).then(({body})=>{
                expect(body.comments.length).toBe(2)
                expect(body.comments[0]).toMatchObject({
                    comment_id: 10,
                    body: 'git push origin master',
                    article_id: 3,
                    author: 'icellusedkars',
                    votes: 0,
                    created_at: expect.stringMatching(datePattern)
                })
            })
        
        })
        test("error:404 when article_id is valid but not found",()=>{
            return request(app).get("/api/articles/999/comments")
            .expect(404).then(({body})=>{   
                expect(body.msg).toBe('Article does not exist')
                })
        })
        test("error:400 when article_id is invalid",()=>{
            return request(app).get("/api/articles/not-a-value/comments")
            .expect(400).then(({body})=>{
                expect(body.msg).toBe('Bad request')
                })
        })
        test("status code:200 when article_id is valid but no comments",()=>{
            return request(app).get("/api/articles/13/comments")
            .expect(200).then(({body})=>{
                expect(body.msg).toBe('No comments for article 13')
                })
        })

    })
})
describe("task 7 - /api/articles/:article_id/comments",()=>{
    describe("POST",()=>{
        test("status code:201 and returns a completed comment entry",()=>{
            return request(app).post("/api/articles/2/comments").send({userName: "icellusedkars",body:"text"})
            .expect(201).then(({body})=>{
                expect(body.newPost).toMatchObject({
                    comment_id:19,
                    author: "icellusedkars",
                    body:"text",
                    article_id: 2,
                    votes:0,
                    created_at: expect.stringMatching(datePattern)
                })
            })
            
        })
        test("error:400 when post request is bad - missing value",()=>{
            return request(app).post("/api/articles/2/comments").send({userName: "icellusedkars"})
            .expect(400).then(({body})=>{
                expect(body.msg).toBe('Bad request')
                })
        })
        test("error:400 when post request is bad - wrong datatype",()=>{
            return request(app).post("/api/articles/2/comments").send({userName: "icellusedkars",body:1234})
            .expect(400).then(({body})=>{
                expect(body.msg).toBe('Bad request')
                })
        })
        test("error:422 when post request is unprocessable (username is not present in users table - violates constraints)",()=>{
            return request(app).post("/api/articles/2/comments").send({userName: "iNeedSleep", body: "text"})
            .expect(422).then(({body})=>{
                expect(body.msg).toBe('Unprocessable Content - possible table constraint violation, check constraints of target table')
            })
        })
    })
})
describe("task 8 - /api/articles/:article_id",()=>{
    describe("PATCH",()=>{
        test("status code:200 and returns updated object with votes increased",()=>{
            return request(app).patch("/api/articles/2").send({inc_votes: 3})
            .expect(200).then(({body})=>{
                expect(body.updatedArt).toMatchObject({
                    title: "Sony Vaio; or, The Laptop",
                    topic: "mitch",
                    author: "icellusedkars",
                    body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                    created_at: expect.stringMatching(datePattern),
                    article_img_url:
                      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                    votes : 3
                  })
            })
        })
        test("status code:200 and returns updated object with votes added to existing value (not 0)",()=>{
            return request(app).patch("/api/articles/1").send({inc_votes: -3})
            .expect(200).then(({body})=>{
                expect(body.updatedArt).toMatchObject({
                    title: "Living in the shadow of a great man",
                    topic: "mitch",
                    author: "butter_bridge",
                    body: "I find this existence challenging",
                    created_at: expect.stringMatching(datePattern),
                    votes: 97,
                    article_img_url:
                      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                  })
            })
        })
        test("error:400 when patch request is bad - wrong datatype",()=>{
            return request(app).patch("/api/articles/1").send({inc_votes: true})
            .expect(400).then(({body})=>{
                expect(body.msg).toBe('Bad request')
            })
        })
        test("error:404 when requested article does not exist",()=>{
            return request(app).patch("/api/articles/999").send({inc_votes: 4})
            .expect(404).then((result)=>{
                expect(result.body.msg).toBe('Article does not exist')
            })
        })
        test("error:400 when requested article does not exist",()=>{
            return request(app).patch("/api/articles/one").send({inc_votes: 4})
            .expect(400).then((result)=>{
                expect(result.body.msg).toBe('Bad request')
            })
        })
    })
})
describe("task 9 - /api/comments/:comment_id",()=>{
    describe("DELETE",()=>{
        test("status code:204 and object is deleted",()=>{
            return request(app).delete("/api/comments/8")
            .expect(204)
        })
        test("error:400 when comment_id is invalid",()=>{
            return request(app).delete("/api/comments/one")
            .expect(400).then(({body})=>{
                expect(body.msg).toBe('Bad request')
            })
        })
        test("error:404 when comment_id is valid but not found",()=>{
            return request(app).delete("/api/comments/19")
            .expect(404).then(({body})=>{
                expect(body.msg).toBe('Comment does not exist')
            })
        })
    })
})
describe("task 10 - /api/users",()=>{
    describe("GET",()=>{
        test("status code :200 and returns an array of users ",()=>{
            return request(app).get("/api/users")
            .expect(200).then(({body})=>{
                const desiredObj =     {
                    username: 'butter_bridge',
                    name: 'jonny',
                    avatar_url:
                      'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
                  }
                expect(Array.isArray(body.users)).toBe(true)
                expect(body.users[0]).toMatchObject(desiredObj)
                expect(body.users.length).toBe(4)
            })
        })
    })
})
describe("task 11 - /api/articles?topic= *",()=>{
    describe("GET QUERY - topic",()=>{
        test("status code:200 and returns an array of articles filtered by topic",()=>{
            return request(app).get("/api/articles?topic=cats")
            .expect(200).then(({body})=>{
                expect(body.articles.length).toBe(1)
                body.articles.forEach((article)=>{
                    expect(article.topic).toBe('cats')
                })
            })
        })
        test("status code:200 and returns an empty array when topic is valid but not featured in any article",()=>{
            return request(app).get("/api/articles?topic=paper")
            .expect(200).then(({body})=>{
                expect(body.articles.length).toBe(0)
                expect(body.articles).toEqual([])
            })
        })
        test("error:404 when query subject is valid but not found",()=>{
            return request(app).get("/api/articles?topic=dogs")
            .expect(404).then(({body})=>{
                expect(body.msg).toBe('Topic not found')
            })
        })

    })
})
describe("task 15 - /api/articles (sorting queries)",()=>{
    describe("GET QUERY - sort_by",()=>{
        test("status code:200 and returns a query sorted by something other than default (created_at)",()=>{
            return request(app).get("/api/articles?sort_by=title&order=ASC")
            .expect(200).then(({body})=>{
                console.log(body.articles)
                expect(body.articles.length).toBe(13)
                expect(body.articles[0]).toMatchObject({
                    article_id: 6,
                    title: "A",
                    topic: "mitch",
                    author: "icellusedkars",
                    votes:0,
                    created_at: expect.stringMatching(datePattern),
                    article_img_url:
                      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                    comment_count:"1"
                  })
            })
        })
    })
})
describe("task 17 - /api/users/:username",()=>{
    describe("GET",()=>{
        test("status code:200 and returns correct user object",()=>{
            return request(app).get("/api/users/lurker")
            .expect(200).then(({body})=>{
                expect(body.user).toMatchObject(  {
                    username: 'lurker',
                    name: 'do_nothing',
                    avatar_url:
                      'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
                  })
            })
        })
        test("error:404 when user doesnt exist",()=>{
            return request(app).get("/api/users/notauser")
            .expect(404).then(({body})=>{
                expect(body.msg).toBe('User does not exist')
            })
        })
    })
})
describe("task 18 - /api/comments/:comment_id",()=>{
    describe("PATCH",()=>{
        test("status code:200 and returns updated object with votes increased",()=>{
            return request(app).patch("/api/comments/2").send({inc_votes: 3})
            .expect(200).then(({body})=>{
                expect(body.updatedCom).toMatchObject(  {
                    body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
                    votes: 17,
                    author: "butter_bridge",
                    article_id: 1,
                    created_at: expect.stringMatching(datePattern),
                  })
            })
        })
    })
})

