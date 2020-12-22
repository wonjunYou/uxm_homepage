var express = require('express');
var router = express.Router();
var Project = require('../models/project');

router.get('/', function(req, res, next) {
    Project.find({},function(err,project){
      res.render('project',{project:project});
    });
    
  });

router.get('/update',function(req, res, next){
  res.render('project_update');
});

router.post('/upload',function(req,res){
  var project = new Project();
  project.kr = req.body.kr;
  project.eng = req.body.eng;
  project.date_start = req.body.date_start;
  project.date_end = req.body.date_end;
  project.category = req.body.category;
  project.save(function(err){
    if(err){
      console.log(err);
    }

    res.redirect('/project');
  });
});
module.exports = router;
