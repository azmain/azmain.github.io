---
title: Spring Boot Starter
categories: programming
---

To start a new project in spring boot we can use any IDE like Netbean, Intellij, Eclipse etc.. 

Spring has one of it's own ide STS(Spring Tool Suite) which is much similar to eclipse.

I will use STS as my preference.

The easy way to start a spring boot project is spring initializr. Search in google, you will find it. Provide the names as asked there. You can add dependencies while create the spring boot project. The most frequently used dependencies are web, jpa, mail, mysql etc. Add dependencies as your need. 

Download the project and import it in your IDE. 

As I  will make API only, I need model and controller in my project. 

As initial step, I will create a user model first. 

## User Model
```Java

package your.package.name;

import javax.persistence.*;


@Entity  //every model is an entity 
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)  //id is our primary key
	private int id;
	private String email;
	private String username;
	private String password;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
```

Now I will write my business logics or whatever you may call it. I will create a class called user manager in which I will write my methods.

## User Manager
```Java
package your.package.name;

import javax.persistence.EntityManagerFactory;
import org.hibernate.SessionFactory;
import org.hibernate.Session;
import org.hibernate.Transaction;
import azmain.github.io.bean.network.RequestBn;
import azmain.github.io.bean.network.ResponseBn;
import azmain.github.io.model.user.User;
import java.util.List;
import javax.persistence.Query;

public class UserManager {
	/* this is a method which returns all my users from my user table.
        Here you can see two different class ResponseBn & RequestBn 
        which are my two utility class. This two
        class help me to return response & accept request. */ 
	public ResponseBn getAllUser(EntityManagerFactory entityManagerFactory){

        //creating a object of ResponseBn to return response.
        ResponseBn responseBn = new ResponseBn();
        
        //creating & starting session
        SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
        Session session = sessionFactory.openSession();
        session.beginTransaction();

        //writing native query and passing the model class
        Query query = session.createNativeQuery("SELECT * FROM user",User.class);
        
        //taking resultset in a list of type user
        List<User> userList = query.getResultList();
        
        //commit transaction and close the session
        session.getTransaction().commit();
        session.close();

        //if there's any user it will return the response else falied response
        if (userList.size()>0){
        	responseBn.setCode(200);
        	responseBn.setMsg("User list fetch successful !");
            responseBn.setList(userList);
            return responseBn;
        }else {
        	responseBn.setCode(404);
            responseBn.setMsg("User list fetch unsuccessful !");
            return responseBn;
        }

    }
}
```

Here is my ResponseBn utility class.

## ResponseBn
```Java
package your.package.name;

import java.util.List;

public class ResponseBn {

	public String msg;  //a message with response
	public int code;  //a code with response
        /* a list of data with response. here the benefit of 
        using ? mark is I can send any type of list */
	public List<?> list; 
	public Object object;  //I can return an obejct also using this ResponseBn

        /* An Empty Constructor */
	public ResponseBn() {}
	
        /* setters and getters */
	public List<?> getList() {
		return list;
	}
	public void setList(List<?> list) {
		this.list = list;
	}
	public Object getObject() {
		return object;
	}
	public void setObject(Object object) {
		this.object = object;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public UserBean getUserBean() {
		return userBean;
	}
	public void setUserBean(UserBean userBean) {
		this.userBean = userBean;
	}
	
}
```

Now I need a controller which will accept the request to a specific url and return response.

## User Controller
```Java

package your.package.name;

import javax.persistence.EntityManagerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import azmain.github.io.bean.network.RequestBn;
import azmain.github.io.bean.network.ResponseBn;
import azmain.github.io.manager.user.UserManager;


@RestController  //this will make this as a rest api
@RequestMapping("/user")  //this will be our url like localhost:8080/user
public class UserController {
	
    @Autowired  //this attach an obejct of EntityManagerFactory class in this class
    private EntityManagerFactory entityManagerFactory;

    @GetMapping("/read")  //this will be our endpoint like localhost:8080/user/read and it's a get request
    public ResponseBn getUser() {
        return new UserManager().getAllUser(entityManagerFactory);  //here we are calling a method get
    }
}
```

I didn't set up the database yet. So, let's setup the database settings. In the project under resources folder there's an application.properties file. Open it and write some code.

## application.properties
```java

## Spring DATASOURCE (DataSourceAutoConfiguration & DataSourceProperties)
spring.datasource.url = jdbc:mysql://localhost:3306/spring_boot
spring.datasource.username = username_of_your_datasource
spring.datasource.password = password_of_your_datasource

## Hibernate Properties
## The SQL dialect makes Hibernate generate better SQL for the chosen database
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5Dialect

## Hibernate ddl auto (create, create-drop, validate, update)
spring.jpa.hibernate.ddl-auto = update

# Preferred JSON mapper to use for HTTP message conversion
spring.http.converters.preferred-json-mapper = gson
```

In the above code - 
* First three lines are for datasource configuration.
* Next one line is for better query.
* Next one line is for auto table generate in the datasource if table doesn't exist.
* Last line is for converting objects into json data.

This is upto now. If everything is okay, run the application.Hopefully the project will start on localhost, port 8080.

As I am running the application for the first time and the table doesn't exist in the datasource, it will create a user table in datasource. By the way I have created the database manually in mysql.

As we don't have any data in our table, I have inserted one row manually in the user table.

Now go to - 
>localhost:8080/user/read

and the output will be like
```json
{
    "msg":"User list fetch successful !","code":200,
    "list":[
        {
            "id":1,
            "email":"email@email.com",
            "username":"username",
            "password":"password"
        }
    ],
    "object":null
}
```

This is the staring of my spring boot project. Next I will insert a user in the table using post method.