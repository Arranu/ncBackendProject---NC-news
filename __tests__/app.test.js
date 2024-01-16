const seed = require("../db/seeds/seed")
const db = require("../db/connection")
const data = require("../db/data/test-data")
const app = require("../app")
const request =require("supertest")

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
