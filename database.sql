create database riddlerLaravel;

use riddlerLaravel;

SET SQL_MODE='ALLOW_INVALID_DATES';

create table users(
    username varchar(64) primary key,
    email varchar(64) unique,
    nome varchar(64) NOT NULL,
    password varchar(255),
    dataNascita date,
    sesso char,
    gifProfilo varchar(255),

    created_at timestamp NOT NULL default 0,
    updated_at timestamp NOT NULL default 0
) engine=INNODB;

create table riddles(
    id integer primary key AUTO_INCREMENT,
    utente varchar(64),
    titolo varchar(255) NOT NULL,
    descrizione varchar(2048) NOT NULL,
    soluzione varchar(1024),
    stato ENUM('ATTESA', 'ACCETTATO', 'RIFIUTATO') NOT NULL,
    sorrisi integer NOT NULL,
    nCommenti integer NOT NULL,

    created_at timestamp NOT NULL default 0,
    updated_at timestamp NOT NULL default 0,

    index Utente(utente),
    foreign key(utente) references users(username) on delete set null on update cascade
) engine=INNODB;

create table comments(
    id integer primary key AUTO_INCREMENT,
    utente varchar(64),
    indovinello integer,
    testo varchar(2048) NOT NULL,
    sorrisi integer NOT NULL,

    created_at timestamp NOT NULL default 0,
    updated_at timestamp NOT NULL default 0,

    index Utente(utente),
    index Indovinello(indovinello),
    foreign key(utente) references users(username) on delete cascade on update cascade,
    foreign key(indovinello) references riddles(id) on delete cascade on update cascade
) engine=INNODB;

create table smiles(
    id integer primary key AUTO_INCREMENT,
    utente varchar(64),
    commento integer,

    created_at timestamp NOT NULL default 0,
    updated_at timestamp NOT NULL default 0,

    index Utente(utente),
    index Commento(commento),
    foreign key(utente) references users(username) on delete cascade on update cascade,
    foreign key(commento) references comments(id) on delete cascade on update cascade
) engine=INNODB;

delimiter //
create trigger addSorriso
after insert on smiles
for each row
begin
    update riddles set sorrisi=sorrisi+1 where id=(select indovinello from comments where new.commento = id LIMIT 1);
    update comments set sorrisi=sorrisi+1 where new.commento = id;
end //
delimiter ;

delimiter //
create trigger removeSorriso
after delete on smiles
for each row
begin
    update riddles set sorrisi=sorrisi-1 where id=(select indovinello from comments where old.commento = id LIMIT 1);
    update comments set sorrisi=sorrisi-1 where old.commento = id;
end //
delimiter ;

delimiter //
create trigger addCommento
after insert on comments
for each row
begin
    update riddles set nCommenti=nCommenti+1 where id = new.indovinello;
end //
delimiter ;