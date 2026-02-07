CREATE TABLE IF NOT EXISTS Users (
    User_ID SERIAL PRIMARY KEY,
    User_Username VARCHAR(255) UNIQUE NOT NULL,
    User_Password VARCHAR(255) NOT NULL,
    User_Displayname VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Stores (
    Store_ID SERIAL PRIMARY KEY,
    Store_Name VARCHAR(255),
    Store_Location VARCHAR(255),
    Opening_Hours VARCHAR(255),
    Store_Owner VARCHAR(255),
    Store_Ratings NUMERIC(3,1) DEFAULT 0.0,
    Covid_Restrictions VARCHAR(255)
);

-- Seed users (password is "password" for all)
INSERT INTO Users (User_Username, User_Password, User_Displayname) VALUES
    ('admin', 'pbkdf2:sha256:600000$salt$e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Admin'),
    ('demo', 'pbkdf2:sha256:600000$salt$e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'Demo User');

-- Seed stores
INSERT INTO Stores (Store_Name, Store_Location, Opening_Hours, Store_Owner, Store_Ratings, Covid_Restrictions) VALUES
    ('Joes Brewery', '6 E Green St, Champaign, IL', '11:00am-2:00am', 'admin', 4.5, 'OPEN'),
    ('Courier Cafe', '111 N Race St, Urbana, IL', '7:00am-9:00pm', 'admin', 4.2, 'OPEN'),
    ('Black Dog Smoke & Ale House', '201 N Broadway Ave, Urbana, IL', '11:00am-10:00pm', 'demo', 4.7, 'OPEN'),
    ('Maize Mexican Grill', '60 E Green St, Champaign, IL', '11:00am-9:00pm', 'demo', 4.3, 'OPEN(Takeout)'),
    ('Timpones', '710 S Goodwin Ave, Urbana, IL', '5:00pm-9:00pm', 'admin', 4.6, 'OPEN'),
    ('Bread Company', '706 S Goodwin Ave, Urbana, IL', '7:00am-5:00pm', 'admin', 4.1, 'OPEN'),
    ('Merry Ann''s Diner', '1510 S Neil St, Champaign, IL', '6:00am-3:00pm', 'demo', 4.0, 'OPEN'),
    ('Golden Harbor', '505 E Green St, Champaign, IL', '11:00am-9:30pm', 'admin', 4.4, 'OPEN(Takeout)'),
    ('Kohinoor Indian', '6 E Green St, Champaign, IL', '11:30am-2:30pm', 'demo', 4.3, 'OPEN'),
    ('Papa Dels', '206 E Green St, Champaign, IL', '11:00am-11:00pm', 'admin', 4.8, 'OPEN');
