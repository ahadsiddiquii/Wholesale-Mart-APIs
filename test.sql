-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2024 at 01:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `categoryImage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `categoryName`, `categoryImage`) VALUES
(1, 'Drinks', '/uploads/image_1708687534360.png'),
(5, 'Spray', '/uploads/image_1708671032863.png'),
(6, 'Boxes', '/uploads/image_1708671044823.png');

-- --------------------------------------------------------

--
-- Table structure for table `loyalty`
--

CREATE TABLE `loyalty` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `loyaltyPoints` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `loyalty`
--

INSERT INTO `loyalty` (`id`, `userId`, `loyaltyPoints`) VALUES
(1, 20, 500);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productImage` varchar(255) NOT NULL,
  `productDescription` varchar(255) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `productQuantityInStock` int(11) NOT NULL,
  `productPrice` float NOT NULL,
  `itemTax` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `productName`, `productImage`, `productDescription`, `categoryId`, `categoryName`, `productQuantityInStock`, `productPrice`, `itemTax`) VALUES
(10, 'Pepsi', '/uploads/image_1708684338225.png', '20ml x 6', 5, 'Spray', 15, 19.99, 1.99),
(11, 'Coca Cola', '/uploads/image_1708670976593.png', '20ml x 6', 3, 'Drinks', 25, 20.99, 0.99),
(12, 'Coca Cola', '/uploads/image_1708671465696.png', '20ml x 6', 3, 'Drinks', 25, 20.99, 0.99);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loyalty`
--
ALTER TABLE `loyalty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `loyalty`
--
ALTER TABLE `loyalty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
