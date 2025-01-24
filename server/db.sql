drop table if EXISTS users;
drop table if EXISTS Admin;
drop table if EXISTS Batch;
drop table if EXISTS Food;
drop table if EXISTS Cart;

CREATE TABLE users (
    userid VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    passwords VARCHAR(60) NOT NULL,
    phonenumber VARCHAR(15)
);

CREATE TABLE Admin (
    Role VARCHAR(10),
    ID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(20),
    Email VARCHAR(20),
    Passwords VARCHAR(20)
);

CREATE TABLE Batch (
    BatchId VARCHAR(10) PRIMARY KEY,
    ManufacturingDate DATE,
    ExpiryDate DATE,
    Manufacture INT
);

CREATE TABLE Food (
    ID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(20),
    BatchID VARCHAR(10),
    cost FLOAT,
    stock INT,
    Description VARCHAR(255),
    FOREIGN KEY (BatchID) REFERENCES Batch(BatchID)
);

CREATE TABLE Cart (
    count INT,
    Userid VARCHAR(36),
    FoodID VARCHAR,
    FOREIGN KEY (Userid) REFERENCES Users(Userid),
    FOREIGN KEY (FoodID) REFERENCES Food(ID)
);

CREATE TABLE WishList (
    FoodID VARCHAR,
    Userid VARCHAR(36),
    FOREIGN KEY (FoodID) REFERENCES food(ID),
    FOREIGN KEY (Userid) REFERENCES users(Userid)
);
