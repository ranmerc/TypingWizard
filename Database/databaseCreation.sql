--DROP DATABASE IF EXISTS typingWizard;
--CREATE DATABASE typingwizard;

--After creating DATABASE navigate to that Database using <typingwizard> <username>


DROP TABLE IF EXISTS lessonsCompleted;
DROP TABLE IF EXISTS typingChallenges;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS userStats;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS forgotPassQuestions;
DROP TABLE IF EXISTS typingTestUser;





---Forgot Password Questions 
CREATE TABLE forgotPassQuestions(qno INT, 
										question TEXT,
										PRIMARY KEY(qno)
										);


--Users Table
CREATE TABLE users(username VARCHAR(100) NOT NULL,
							password VARCHAR(100) NOT NULL,
							forgotquestionNo INT REFERENCES forgotPassQuestions(qno) on update set null on delete cascade,
							answer TEXT NOT NULL,
							PRIMARY KEY(username)
							);
							

--Lesson Table

-- lessonId 			- 				will be of the form 1.0 ,1.1 representing each sublesson  
--lessonsInstruction-				represents instruction for each lesson/sublesson
--mockPara			-				Mock paragraph for practice based on keys learnt 
--lessonName       -				Lesson Name

CREATE TABLE lessons(lessonId VARCHAR(10),	
							mockPara TEXT,	
							lessonName varchar(100),
							PRIMARY KEY(lessonId)
							);
							

--Typing Challenge

-- typingTestid - for each  lesson we have a Typing Challenge therefore typingTestId , of the form FLOAT(ex 1.1,1.2)
--lessonId		- 
--para            - paragraph for each typing challenge

CREATE TABLE typingChallenges(typingTestId FLOAT,
										para    TEXT,
										PRIMARY KEY(typingTestId)
										);

-- User Stats

-- Save user performance in practices

--topSpeed -    User's top  speed uptil now
--averageSpeed - Average Speed of user until now
--averageError - Average Error of user until now
--totalSamples- 

CREATE TABLE userStats(username varchar(100) REFERENCES users(username) on update set null on delete cascade,
								topSpeed FLOAT,
								averageSpeed FLOAT,
								averageError FLOAT,
								totalSamples INT
								);
						
--Lessons Completed

-- Use to keep track of how many users have completed a challenge
--Use to keep track of how many challenges have been completed by a user
--Track prgress of each user because max(lessonId) for a user will
--Give the last lesson completed by a user 


CREATE TABLE lessonsCompleted(username VARCHAR(100) REFERENCES users(username) on update set null on delete cascade,
										 lessonId   VARCHAR(10)  REFERENCES lessons(lessonId) on update set null on delete cascade,
										PRIMARY KEY (username,lessonId)
										);		

	
CREATE TABLE typingTestUser(testNo INT,username VARCHAR(100) REFERENCES users(username) on update set null on delete cascade,wpm FLOAT,error INT
									,PRIMARY KEY (username,testNo));


 