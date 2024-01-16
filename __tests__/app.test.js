const seed = require("../db/seeds/seed")
const db = require("../db/connection")
const data = require("../db/data/test-data")
const app = require("../app")
const request =require("supertest")
const apiFile = require("../endpoints.json")

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
        test("Error:404 when input is invalid",()=>{
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
describe("task 4 - /api/articles/:article_id",()=>{
    describe("GET",()=>{
        test("status code:200 and correct object returned",()=>{
        return request(app).get("/api/articles/1")
            .expect(200).then(({body})=>{
                const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
            expect(body.article).toMatchObject(expect.objectContaining({
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
          }))
        })
        
    })
        test("status code:200 and correct object returned",()=>{
            return request(app).get("/api/articles/2")
            .expect(200).then(({body})=>{
                const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
            expect(body.article).toMatchObject(expect.objectContaining({
                article_id:2,
                votes:0,
                title: "Sony Vaio; or, The Laptop",
                topic: "mitch",
                author: "icellusedkars",
                body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                created_at: expect.stringMatching(datePattern),
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              }))
            })
            
        })
        test("Error:404 when input is valid but not found",()=>{
            return request(app).get("/api/articles/999")
            .expect(404).then(({body})=>{   
                expect(body.msg).toBe('article does not exist')
                })
        })
        test("Error:400 when input is invalid",()=>{
            return request(app).get("/api/articles/not-a-value")
            .expect(400).then(({body})=>{
                expect(body.msg).toBe('Bad request')
                })
        })
    })
})