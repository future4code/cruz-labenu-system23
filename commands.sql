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
  data_nasc DATE NOT NULL
);

CREATE TABLE teacher (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  data_nasc DATE NOT NULL
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

CREATE TABLE class_students (
  turma_id INT NOT NULL,
  estudante_id INT NOT NULL PRIMARY KEY,
  FOREIGN KEY (turma_id) REFERENCES class(id),
  FOREIGN KEY (estudante_id) REFERENCES student(id)
);

CREATE TABLE class_teachers (
  turma_id INT NOT NULL,
  professor_id INT NOT NULL,
  CONSTRAINT class_teachers PRIMARY KEY (turma_id, professor_id),
  FOREIGN KEY (turma_id) REFERENCES class(id),
  FOREIGN KEY (professor_id) REFERENCES teacher(id)

);

-- ADICIONANDO ALUNOS EM TURMAS
INSERT INTO
  class_students (turma_id, estudante_id)
VALUES
  (1, 1),
  (1, 2);

-- ADICIONANDO PROFESSORES EM TURMAS
INSERT INTO
  class_teachers (turma_id, professor_id)
VALUES
  (1, 1),
  (2, 1),
  (1, 2);

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

-- CRIANDO ALUNOS
INSERT INTO
  student(nome, email, data_nasc)
VALUES
  (
    'Marcelino',
    'marcelino@hack.com',
    '1990-01-31'
  ),
  (
    'Lucas',
    'lucas@ehavida.com',
    '1990-01-31'
  );

-- CRIANDO PROFESSORES
INSERT INTO
  teacher(nome, email, data_nasc)
VALUES
  (
    'João Alves',
    'jão@labenu.com',
    '1995-01-01'
  ),
  (
    'Matheus Gesualdo',
    'matt@labenu.com',
    '1995-01-01'
  );

-- SELECIONANDO TODOS ESTUDANTES DE UMA TURMA
SELECT
  student.nome,
  class.nome as turma
FROM
  class_students
  JOIN student
  JOIN class
WHERE
  class.id = 1
  AND class_students.turma_id = 1
  AND class_students.estudante_id = student.id;


-- SELECIONANDO TODOS PROFESSORES DE UMA TURMA
SELECT
  teacher.nome,
  class.nome as turma
FROM
  class_teachers
  JOIN teacher
  JOIN class
WHERE
  class.id = 1
  AND class_teachers.turma_id = 1
  AND class_teachers.professor_id = teacher.id;


-- CRIAR TURMA
CREATE TABLE class (nome, data_inicio, data_final,)
VALUES
  ('Nova turma', '2021-06-04', '2021-12-04');