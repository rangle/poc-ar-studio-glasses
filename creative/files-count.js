var fs = require('fs');

fs.readdir('./triangles-black-x100-@128x128', (error, files) => {
  //fs.readdir('./snapchat 128-keyframes-100', (error, files) => {
    if (error) throw error;



    //files.filter(name => /script\.\d+\.js$/.test(name)).forEach(fs.unlink);
    for (var i = 0, len = files.length; i < len; i++) {
      if (files[i] !== ".DS_Store") console.log('i: ',i,', len: ',len);

    	// console.log(i % 7 == 0);
    	// console.log(len);
    	// if ((i+1)%8==0 && files[i] !== ".DS_Store"){
     //    console.log("files: ",files[i]);
     //  } else {
     //    fs.unlink('./snapchat-128-node/'+files[i], (err)=>{
     //      if (err) {
     //        console.log('ERROR: ',err);
     //      }
     //    });
     //  }
      // var match = files[i].match(/en.*.js/);
      // if(match !== null)
      //     fs.unlink(match[0]);
   }
});