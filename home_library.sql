-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Май 21 2021 г., 12:22
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `home_library`
--

-- --------------------------------------------------------

--
-- Структура таблицы `author`
--

CREATE TABLE IF NOT EXISTS `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `patronymic` varchar(100) DEFAULT NULL,
  `bio` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `author`
--

INSERT INTO `author` (`id`, `name`, `surname`, `patronymic`, `bio`) VALUES
(1, 'Лев', 'Толстой', 'Николаевич', 'Лев Толстой — один из самых известных писателей и философов в мире. Его взгляды и убеждения легли в основу целого религиозно-философского течения, которое называют толстовством. Литературное наследие писателя составило 90 томов художественных и публицистических произведений, дневниковых заметок и писем, а самого его не раз номинировали на Нобелевскую премию по литературе и Нобелевскую премию мира.'),
(2, 'Фёдор', 'Достоевский', 'Михайлович', 'Федор Достоевский с детства мечтал стать писателем. Первый же его роман «Бедные люди» высоко оценили Николай Некрасов и Виссарион Белинский, а четыре поздних произведения вошли в список «100 лучших книг всех времен».');

-- --------------------------------------------------------

--
-- Структура таблицы `book`
--

CREATE TABLE IF NOT EXISTS `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `id_author` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `book`
--

INSERT INTO `book` (`id`, `name`, `id_author`, `id_genre`, `description`, `image`) VALUES
(1, 'Война и мир', 1, 1, '«Война́ и мир» (рус. дореф. «Война и миръ») — роман-эпопея Льва Николаевича Толстого, описывающий русское общество в эпоху войн против Наполеона в 1805—1812 годах. Эпилог романа доводит повествование до 1820 года.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Толстой_Л._Н._Война_и_мир%2C_Т._1._Обложка'),
(2, 'Преступление и наказание', 2, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `genre`
--

CREATE TABLE IF NOT EXISTS `genre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Дамп данных таблицы `genre`
--

INSERT INTO `genre` (`id`, `name`, `description`) VALUES
(1, 'роман-эпопея', 'роман-эпопея'),
(2, 'Роман', 'Роман'),
(3, 'Видения', 'Видения'),
(4, 'Новелла', 'Новелла'),
(5, 'Ода', 'Ода'),
(6, 'Опус', 'Опус'),
(7, 'Очерк', 'Очерк'),
(8, 'Поэма', 'Поэма'),
(9, 'Повесть', 'Повесть'),
(10, 'Пьеса', 'Пьеса'),
(11, 'Рассказ', 'Рассказ'),
(12, 'Роман', 'Роман'),
(13, 'Эссе', 'Эссе'),
(14, 'Эпос', 'Эпос');

-- --------------------------------------------------------

--
-- Структура таблицы `library`
--

CREATE TABLE IF NOT EXISTS `library` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `library`
--

INSERT INTO `library` (`id`, `id_user`, `name`, `description`, `image`) VALUES
(1, 1, 'Библиотека семьи Ивановых', 'test', NULL),
(2, 3, 'Библиотека семьи Карповых', NULL, NULL),
(3, 3, 'Простая библиотека', '', NULL),
(4, 2, 'Простая библиотека 2', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_publication` int(11) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `is_start` tinyint(1) NOT NULL,
  `is_end` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `order`
--

INSERT INTO `order` (`id`, `id_user`, `id_publication`, `date_start`, `date_end`, `is_start`, `is_end`) VALUES
(1, 2, 1, '2021-04-11', '2021-04-30', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `place`
--

CREATE TABLE IF NOT EXISTS `place` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_library` int(11) NOT NULL,
  `cupboard` varchar(100) DEFAULT NULL,
  `shelf` int(11) DEFAULT NULL,
  `pc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `place`
--

INSERT INTO `place` (`id`, `id_library`, `cupboard`, `shelf`, `pc`) VALUES
(1, 1, '1', 1, NULL),
(2, 2, 'Основной шкаф', 2, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `publication`
--

CREATE TABLE IF NOT EXISTS `publication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_book` int(11) NOT NULL,
  `id_library` int(11) NOT NULL,
  `id_publisher` int(11) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `year_publishing` int(11) NOT NULL,
  `id_place` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `publication`
--

INSERT INTO `publication` (`id`, `id_book`, `id_library`, `id_publisher`, `image`, `description`, `year_publishing`, `id_place`, `type`) VALUES
(1, 1, 1, 1, NULL, NULL, 2020, 1, 1),
(2, 2, 2, 2, NULL, NULL, 2005, 2, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `publisher`
--

CREATE TABLE IF NOT EXISTS `publisher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `adress` varchar(1000) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `publisher`
--

INSERT INTO `publisher` (`id`, `name`, `adress`, `description`) VALUES
(1, 'Эксмо', 'Издательство «ЭКСМО»\r\n123308, г. Москва, ул. Зорге, д.1, стр.1.', 'Издательство «Эксмо» — универсальное издательство № 1 в России, является одним из лидеров книжного рынка Европы.'),
(2, 'АСТ', NULL, 'Издательская группа «АСТ» — одно из двух крупнейших издательств России. Основано в 1990 году как ТКО "АСТ". Является универсальным издательством: выпускает художественную литературу, нон-фикшн, популярные пособия.');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `username`, `email`, `password`, `age`, `role`) VALUES
(1, 'test', 'test', 'test', '', 'test', 20, 'user'),
(2, 'test2', 'test2', 'test2', '', 'test2', 20, 'user'),
(3, 'Иван', 'Иванов', 'ivankek', '', '1234', 25, 'user'),
(4, 'User1', 'User1', 'User1', '', 'User1User1', NULL, 'user'),
(22, 'dpoksdf', 'dpokfs', 'qweqwe234asd', 'pdofk@klds.c', '$2a$10$Q7GSAwZCgd8W8.2bWZcXxerL2dUrEPbaPa7.ugdsK6Zn/HbF8Fi72', NULL, 'admin');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
