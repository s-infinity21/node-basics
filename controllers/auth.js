const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const session = require("express-session");
//const { post } = require("../routes/auth");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect()

//var sess = true;

module.exports.register = (req, res) => {
    console.log(req.body);
    const {name, mobnum, email, password, passwordConfirm} = req.body; 
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error)
        {
            console.log(error);
        }
        if(results.length>0)
        {
            return res.render("register",{
                message:"E-mail already in use"
            });      
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

    db.query("INSERT INTO users SET ?",{name: name, mobnum: mobnum, email: email, password: hashedPassword}, (error, results) =>{
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log(results);
            return res.render("login",{
                message:"USER REGISTERED SUCCESSFULLY"
            });      
        }
        })
    });

}

module.exports.login = (req,res) => {
    console.log("Users Connected");
    try {
	  email = req.body.email
  	  password = req.body.password
      console.log(email+" "+password);
      const GRAB_USER = `SELECT * FROM users WHERE email = ?`
  	  db.query(GRAB_USER, [email], async(err, results) => {
         console.log(results);
         if(err || results.length==0 || !(await bcrypt.compare(password, results[0].password)))
         {
             return res.render("login",{
                 message:"E-mail or Password Incorrect"
             });
         }
        else
            {
                const id = results[0].id;
                name = results[0].name;
                mobnum = results[0].mobnum;
                const token = jwt.sign({ id }, process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("The token is: "+token);

                const cookieOptions ={
                    expires: new Date(
                        Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 *1000
                    ),
                    httpOnly: true
                }
                res.cookie("jwt",token,cookieOptions);
                return res.redirect("/home");
            }
	  });
        
    } catch (error) {
        console.log(error);
    }
};

module.exports.profile = (req,res) => {
    const GRAB_USER = `SELECT * FROM users WHERE email = ?`
      db.query(GRAB_USER, [email], async(error, results) => {
       console.log(results);
      if(error)
      {
          console.log(error);
      }
      else
      {
        return res.render("profile",{
          message1: "Name: "+name,
          message2: "Contact Info: "+mobnum,
          message3: "E-mail: "+email
         });    
      }
  });
}

module.exports.query = (req, res) =>{
    console.log(req.body);
    const {q_title, q_ans} = req.body; 
    db.query("SELECT * FROM query", async (error, results) =>
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log("Query Connected");
            db.query("INSERT INTO query SET ?",{q_title: q_title, q_ans: q_ans}, (error, results) =>
            {
                if(error)
                {
                    console.log(error);
                }
                else
                {
                    console.log(results);
                    return res.render("query",
                    {
                        message:"Query Added"
                    });      
                }
            })
        }
    })
}

module.exports.home = (req, res) =>{
    const GRAB_USER = `SELECT * FROM query`
      db.query(GRAB_USER, async(error, results) => {
       console.log(results);
      if(error)
      {
          console.log(error);
      }
      else
      {
        return res.render("home",{
          question: q_ans,
          category: q_title
        });    
      }
  });
}

module.exports.logout = (req,res)=>{
    try{
            sess = false;
            res.redirect("/");
    }
    catch(error){
        console.log(error);
    }
}
