DROP DATABASE IF EXISTS sandbox;
CREATE DATABASE sandbox;
USE sandbox;

CREATE TABLE sandyments (
  department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE sandyroles (
  role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INTEGER,
  CONSTRAINT fk_department
    FOREIGN KEY (department_id)
    REFERENCES sandyments(department_id)
    ON DELETE SET NULL
);

CREATE TABLE sandyees (
  employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_role_id
    FOREIGN KEY (role_id)
    REFERENCES sandyroles(role_id)
    ON DELETE SET NULL,
  CONSTRAINT fk_manager_id
    FOREIGN KEY (manager_id)
    REFERENCES sandyees(employee_id)
    ON DELETE SET NULL
);

INSERT INTO sandyments
  ( department_name )
VALUES
  ('Marketing'),
  ('Finance'),
  ('Engineering'),
  ('Public Relations'),
  ('Maintenance');

INSERT INTO sandyroles
  ( title, salary, department_id )
VALUES
  ('CEO', 190000.00, 4 ),
  ('Market Analyst', 120000.00, 1 ),
  ('Accountant', 125000.00, 2 ),
  ('Lead Engineer', 160000.00, 3 ),
  ('City Liaison', 130000.00, 4 ),
  ('Cleaner', 110000.00, 5 ),
  ('CFO', 175000.00, 2 ),
  ('Software Developer', 140000.00, 3 ),
  ('Polisher', 250000.00, 5 ),
  ('Intern', 105000.00, 3 ),
  ('Volunteer', NULL, NULL ),
  ('Emeritus', 25000.00, NULL );

INSERT INTO sandyees
  ( first_name, last_name, role_id, manager_id )
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 7, 1),
  ('Robert', 'Bruce', 2, 2),
  ('Peter', 'Greenaway', 3, 2),
  ('Derek', 'Jarman', 4, 2),
  ('Paolo', 'Pasolini', 4, 2),
  ('Heathcote', 'Williams', 5, NULL),
  ('Sandy', 'Powell', 6, 1),
  ('Emil', 'Zola', 6, 4),
  ('Sissy', 'Coalpits', 8, 4),
  ('Antoinette', 'Capet', 9, 4),
  ('Samuel', 'Delany', 10, 4),
  ('Tony', 'Duvert', 2, 2),
  ('Dennis', 'Cooper', 3, 7),
  ('Monica', 'Bellucci', 8, 4),
  ('Samuel', 'Johnson', 8, 4),
  ('John', 'Dryden', 8, 4),
  ('Alexander', 'Pope', 9, NULL),
  ('Lionel', 'Johnson', 10, 4),
  ('Aubrey', 'Beardsley', 10, 1),
  ('Tulse', 'Luper', 10, 2),
  ('Happygo', 'Lucky', NULL, 2),
  ('Wonderful', 'Time', 11, NULL);
