CREATE SCHEMA `pj2` ;

CREATE TABLE `pj1`.`user` (
  `Id` VARCHAR(20) NOT NULL,
  `Password` VARCHAR(20) NOT NULL,
  `Grade` VARCHAR(45) NOT NULL DEFAULT 'User',
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC) VISIBLE);

SELECT * FROM pj1.user;
INSERT INTO `pj1`.`user` (`Id`, `Password`, `Grade`) VALUES ('admin', 'admin123', 'Admin');


CREATE TABLE `pj1`.`board` (
  `Index` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(20) NOT NULL,
  `Content` VARCHAR(1000) NOT NULL,
  `user_Id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Index`),
  INDEX `Id_idx` (`user_Id` ASC) VISIBLE,
  CONSTRAINT `Id`
    FOREIGN KEY (`user_Id`)
    REFERENCES `pj1`.`user` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

SELECT * FROM pj1.board;
INSERT INTO `pj1`.`board` (`Title`, `Content`, `user_Id`) VALUES ('게시글1', 'Test용', 'admin');


CREATE TABLE `pj1`.`comment` (
  `Index` INT NOT NULL AUTO_INCREMENT,
  `Content` VARCHAR(200) NOT NULL,
  `comment_id` VARCHAR(45) NOT NULL,
  `board_index` INT NOT NULL,
  PRIMARY KEY (`Index`),
  INDEX `comment_id_idx` (`comment_id` ASC) VISIBLE,
  INDEX `board_index_idx` (`board_index` ASC) VISIBLE,
  CONSTRAINT `comment_id`
    FOREIGN KEY (`comment_id`)
    REFERENCES `pj1`.`user` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `board_index`
    FOREIGN KEY (`board_index`)
    REFERENCES `pj1`.`board` (`Index`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
SELECT * FROM pj1.comment;
INSERT INTO `pj1`.`comment` (`Content`, `comment_Id`, `board_index`) VALUES ('Test 댓글', 'admin', 1);