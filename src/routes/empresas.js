const e = require('express');
const {Router}= require('express');
const router= Router();
const under= require('underscore');

const empresasjson=require('../empresas.json');

router.get('/ejemplo',(req, res) =>{
    res.send('Hola mundo');
});

//obetener empresas 
router.get('/empresas' ,(req, res) =>{
    res.json(empresasjson);
});

//insertar una empresa 
router.post('/empresas',(req, res)=>{
    const{ id, empresa, descripcion}=req.body;
    if(id && empresa && descripcion){
        const id= empresasjson.length +1;
        const nuevaempresa= {...req.body , id};
        empresasjson.push(nuevaempresa);
        res.json(empresasjson);
    }  else{
        res.send('Wrong Request');
    }
});

//modificar
router.put('/empresas/:id',(req ,res)=>{
    const{id}=req.params;
    const{empresa, descripcion}=req.body;
    if(id && empresa && descripcion){
        under.each(empresasjson, (e ,i)=>{
            if(e.id== id){
                e.empresa=empresa;
                e.descripcion=descripcion;
            }
        });
        res.json(empresasjson)
    } else{
    res.status('500').json({error: 'Hay un error en el servidor'});
}
});

//eliminar
router.delete('/empresas/:id',(req ,res)=>{
    const{id}=req.params;
    if(id){
        under.each(empresasjson, (e, i)=>{
            empresasjson.splice(i, 1);
        });
        res.json(empresasjson);
    }else{
        res.status('500').json({error: 'Hay un error el server '}) 
    }
})

module.exports=router;