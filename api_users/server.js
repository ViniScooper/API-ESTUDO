import express from 'express'; 
import cors from 'cors';

import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient()


const app = express();
app.use(cors()); // Adicione esta linha
app.use(express.json()); //garante que a gnte vai usar o json no body das requisicoes




app.post('/usuarios', async (req, res) => {
    

  try {  
   await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
           
        }
        
    })
    return res.status(201).json(req.body) //retorna o status 201 que é de sucesso na criação e uma mensagem
    } catch (error) {
        console.error(error.message)
    }
    
})



app.get('/usuarios' ,async(req , res) => { 

    try {
        const users = await prisma.user.findMany()
        return res.status(200).json(users) //busca todos os usuarios no banco de dados
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro ao buscar usuários' }) //retorna o status 500 que é de erro interno do servidor
    }


    
 
    
})

//passo a porta que o servidor vai escutar
 
app.listen(3000)
console.log('Servidor rodando na porta 3000');

//para rodar o servidor, use o comando: node server.js
    

// na rota post crio o usuario e na rota get consigo pegar todos os usuarios que foram criados