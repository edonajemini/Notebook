import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;


//get all notes
app.get("/notes", async (req, res) => {
    try {
      const notes = await prisma.notes.findMany({
      });
  
      res.send(notes);
    } catch (error) {
      // @ts-ignore
      res.status(500).send({ error: error.message });
    }
  });

//delete notes
app.delete("/notes/:id", async (req, res) => {
    try {
      const note = await prisma.notes.delete({
        where: { id: Number(req.params.id) },
      });
      res.send(note);
    } catch (error) {
      res.status(400).send({ error: error });
    }
  });

//notes that are done
  app.get("/doneNotes", async (req, res) => {
    const notes = await prisma.notes.findMany({
      where: {
        done: true,
      }
    });
    res.send(notes);
  })

//add note
app.post('/postNotes', async (req, res)=>{
    const note = {
      tittle :req.body.tittle,
      text :req.body.text,       
      category :req.body.category,
      done:       false
    }
    try{
        const newNote = await prisma.notes.create({
        data: {
          tittle :note.tittle,
          text :note.text,       
          category :note.category,
          done: false
        }
        })
        res.send(newNote)
    } catch(err) {
        // @ts-ignore
        res.status(400).send(err.message)   
    }
  })
  //Get all notes searched by tittle
app.get("/searchnotes/:tittle", async (req, res) => {
    try {
      const { tittle } = req.params;
  
      const notes = await prisma.notes.findMany({
        where: { tittle: { contains: tittle } }
      });
  
      res.send(notes);
    } catch (error) {
      // @ts-ignore
      res.status(500).send({ error: error.message });
    }
  });


  //Get all notes filtered by category
  app.get("/notes/:category", async (req, res) => {
    try {
      const { category } = req.params;
  
      const notes = await prisma.notes.findMany({
        where: { category: category }
      });
  
      res.send(notes);
    } catch (error) {
      // @ts-ignore
      res.status(500).send({ error: error.message });
    }
  });

  //change the notes to done
app.patch("/doneNotes/:id", async (req, res) => {
    try {
    const note = await prisma.notes.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        done: req.body.done
      }
    })
    res.send(note);
  } catch (error) {
    // @ts-ignore
    res.status(404).send({ error: error.message });
  }
  })

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
  });
  