import express from 'express'; 
import cors from 'cors';

import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient()


const app = express();
app.use(cors()); // Adicione esta linha
app.use(express.json()); //garante que a gnte vai usar o json no body das requisicoes



//-------------------------------------------------------------------------------------------------------------------------//

//rota get para buscar um usuario pelo id

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



//criando o metodo put para atualizar o usuario



app.put('/usuarios/:id', async (req, res) => {
    console.log(req)
   
    
  try {  
   await prisma.user.update({
       
    where: {
        id:req.params.id //aqui estou passando o id do usuario que quero atualizar
    },
        //aqui estou passando os dados que quero atualizar
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




//-------------------------------------------------------------------------------------------------------------------------//


//rota de delete


app.delete('/usuarios/:id', async (req, res) => {
    
   
    
  try {  
    await prisma.user.delete({
        
        where: {
            id:req.params.id //aqui estou passando o id do usuario que quero atualizar
        }
    
    })


    return res.status(200).json({mensage :"user deletado com sucesso "}) //retorna o status 201 que é de sucesso na criação e uma mensagem
    } catch (error) {
        console.error(error.message)
    }
 
})



//-------------------------------------------------------------------------------------------------------------------------//


//rota get para buscar todos os usuarios


app.get('/usuarios', async (req, res) => {
    try {
        let users = [];
        // Monta o filtro dinamicamente usando req.query
        const where = {};
        if (req.query.name) where.name = req.query.name;
        if (req.query.email) where.email = req.query.email;
        if (req.query.age) where.age = Number(req.query.age);

        if (Object.keys(where).length) {
            users = await prisma.user.findMany({ where });
        } else {
            users = await prisma.user.findMany();
        }




        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
})




//-------------------------------------------------------------------------------------------------------------------------//





//passo a porta que o servidor vai escutar
 
app.listen(3000)
console.log('Servidor rodando na porta 3000');

//para rodar o servidor, use o comando: node server.js
    

// na rota post crio o usuario e na rota get consigo pegar todos os usuarios que foram criados