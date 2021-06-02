-- Criando as tabelas
CREATE TABLE class (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  data_inicio DATE NOT NULL,
  data_final DATE NOT NULL,
  modulo INT NOT NULL DEFAULT 0
);

CREATE TABLE student (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  data_nasc DATE NOT NULL,
  turma_id INT NOT NULL,
  FOREIGN KEY (turma_id) REFERENCES class(id)
);

CREATE TABLE teacher (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  data_nasc DATE NOT NULL,
  turma_id INT NOT NULL,
  FOREIGN KEY (turma_id) REFERENCES class(id)
);

CREATE TABLE hobbie (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL
);

CREATE TABLE specialty (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome ENUM(
    'React',
    'Redux',
    'CSS',
    'Testes',
    'Typescript',
    'Programação Orientada a Objetos',
    'Backend'
  ) NOT NULL
);

-- INSERINDO VALORES
INSERT INTO
  class(nome, data_inicio, data_final, modulo)
VALUES
  (
    'Epps',
    '2020-03-01',
    '2020-08-01',
    6
  ),
  (
    'Cruz',
    '2021-03-01',
    '2021-08-01',
    4
  );

INSERT INTO
  student(nome, email, data_nasc, turma_id)
VALUES
  (
    'Nicolas',
    'nicolas@nicolas.com',
    '2002-07-22',
    1
  ),
  (
    'Janis',
    'janis@janis.com',
    '1998-05-09',
    1
  );

INSERT INTO
  teacher(nome, email, data_nasc, turma_id)
VALUES
  (
    'João Alves',
    'jão@labenu.com',
    '1995-01-01',
    1
  ),
   (
    'Matheus Gesualdo',
    'matt@labenu.com',
    '1995-01-01',
    2
  );