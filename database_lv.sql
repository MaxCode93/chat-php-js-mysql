
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_anu`
--

CREATE TABLE `info_anu` (
  `id` int(11) NOT NULL,
  `thumb` varchar(16) NOT NULL DEFAULT 'mess.png',
  `announce` longtext NOT NULL,
  `dir` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `info_anu`
--

INSERT INTO `info_anu` (`id`, `thumb`, `announce`, `dir`) VALUES
(1, 'livemess.png', '<font color=#425F9B>Si desea registrarse por favor ir a Menu Principal -> Cambiar Clave y automaticamente formara parte de nosotros.', ''),
(2, 'livemess.png', '<font color=#425F9B>Si desea llenar su perfil favor ir a Menu Principal -> Editar Perfil  llene los campos que decida que se muestren en su profile,  luego Guardar Datos. ', ''),
(3, 'livemess.png', '<font color=#425F9B>Usted puede establecer una foto de Perfil desde Menu Principal -> Foto de Perfil,  sea selectivo a la hora de establecer su Foto.', ''),
(5, 'livemess.png', '<font color=#425F9B>Gracias por darnos el placer de compartir con usted difruta de nuestro espacio y comparte tus gusto acerca de nuestra Comunidad.', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_ban`
--

CREATE TABLE `info_ban` (
  `id` int(11) NOT NULL,
  `user` varchar(20) CHARACTER SET latin1 NOT NULL,
  `ip` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `motiv` varchar(80) CHARACTER SET latin1 NOT NULL,
  `oper` varchar(20) CHARACTER SET latin1 NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_config`
--

CREATE TABLE `info_config` (
  `chat_name` varchar(200) NOT NULL DEFAULT 'LiveMessenger',
  `chat_title` varchar(2000) NOT NULL DEFAULT 'Chat Educativo',
  `chat_des` varchar(200) NOT NULL DEFAULT 'Difruta nuestro chat',
  `chat_ver` varchar(100) NOT NULL DEFAULT '17.8.2',
  `chat_owner` varchar(100) NOT NULL DEFAULT 'Maxwell',
  `chat_cmaster` varchar(50) NOT NULL,
  `chat_cvisual` varchar(50) NOT NULL,
  `chat_root_pass` varchar(150) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `info_config`
--

INSERT INTO `info_config` (`chat_name`, `chat_title`, `chat_des`, `chat_ver`, `chat_owner`, `chat_cmaster`, `chat_cvisual`, `chat_root_pass`) VALUES
('LiveMessenger', 'Chat Educativo', 'Difruta Nuestro Chat', '17.8.2', 'Maxwell', 'Maxwell', 'DarKnigth', 'YWRtaW4=');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_files`
--

CREATE TABLE `info_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `usid` int(11) NOT NULL DEFAULT '0',
  `fname` varchar(70) NOT NULL DEFAULT '',
  `fsize` bigint(20) NOT NULL DEFAULT '0',
  `fref` varchar(255) NOT NULL DEFAULT '',
  `usfdir` varchar(255) NOT NULL,
  `uauth` varchar(46) NOT NULL DEFAULT '',
  `prev` varchar(22) NOT NULL,
  `fprop` varchar(150) NOT NULL,
  `fecha` varchar(150) NOT NULL,
  `fexpira` varchar(150) NOT NULL,
  `ext` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_files2`
--

CREATE TABLE `info_files2` (
  `id` int(255) NOT NULL,
  `usid` int(150) NOT NULL,
  `fref` varchar(150) NOT NULL DEFAULT '',
  `fecha` varchar(150) NOT NULL,
  `fexpira` varchar(150) NOT NULL,
  `ext` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_friend`
--

CREATE TABLE `info_friend` (
  `id` int(11) NOT NULL,
  `from` varchar(16) NOT NULL,
  `dest` varchar(16) NOT NULL,
  `us_id` int(11) NOT NULL,
  `thumb` varchar(16) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_friend2`
--

CREATE TABLE `info_friend2` (
  `id` int(11) NOT NULL,
  `me` varchar(16) NOT NULL,
  `dest` varchar(16) NOT NULL,
  `thumb` varchar(16) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_mess`
--

CREATE TABLE `info_mess` (
  `id` int(11) NOT NULL,
  `from` varchar(16) CHARACTER SET latin1 NOT NULL,
  `thumb` varchar(11) CHARACTER SET latin1 NOT NULL,
  `dest` varchar(16) CHARACTER SET latin1 NOT NULL,
  `mess` varchar(400) CHARACTER SET latin1 NOT NULL,
  `time` text NOT NULL,
  `look` int(11) NOT NULL,
  `arrival` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_mess2`
--

CREATE TABLE `info_mess2` (
  `id` int(11) NOT NULL,
  `mfrom` varchar(16) NOT NULL,
  `mdest` varchar(16) NOT NULL,
  `mmess` varchar(300) NOT NULL,
  `mtime` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_notif`
--

CREATE TABLE `info_notif` (
  `id` int(11) NOT NULL,
  `from` varchar(16) NOT NULL,
  `thumb` varchar(11) NOT NULL,
  `dest` varchar(16) NOT NULL,
  `mess` varchar(400) NOT NULL,
  `time` text NOT NULL,
  `look` int(11) NOT NULL,
  `arrival` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_online`
--

CREATE TABLE `info_online` (
  `id` int(10) UNSIGNED NOT NULL,
  `me` int(11) NOT NULL DEFAULT '0',
  `user` varchar(20) NOT NULL DEFAULT '',
  `data` longtext NOT NULL,
  `priv` int(11) NOT NULL,
  `adm` int(11) NOT NULL,
  `q1` longtext NOT NULL,
  `q2` longtext NOT NULL,
  `active` int(11) NOT NULL DEFAULT '0',
  `lconn` int(11) NOT NULL DEFAULT '0',
  `root` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_stats`
--

CREATE TABLE `info_stats` (
  `visit` int(11) NOT NULL,
  `mmax` int(11) NOT NULL,
  `ddate` varchar(10) NOT NULL,
  `id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_users`
--

CREATE TABLE `info_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `user` varchar(20) NOT NULL DEFAULT '',
  `pass` varchar(50) NOT NULL DEFAULT '',
  `estado` varchar(1) NOT NULL,
  `sex` char(1) NOT NULL,
  `cou` varchar(6) NOT NULL DEFAULT '',
  `prov` varchar(150) NOT NULL DEFAULT 'cu.png',
  `active` tinyint(4) NOT NULL DEFAULT '-1',
  `stt` int(11) NOT NULL DEFAULT '0',
  `priv` int(11) NOT NULL DEFAULT '0',
  `adm` int(11) NOT NULL,
  `adjunto` int(10) NOT NULL DEFAULT '0',
  `att` int(11) NOT NULL DEFAULT '0',
  `nav` char(2) NOT NULL DEFAULT '',
  `ip` varchar(100) NOT NULL DEFAULT '',
  `ttim` int(11) NOT NULL,
  `lconn` int(11) NOT NULL DEFAULT '0',
  `fij` tinyint(4) NOT NULL DEFAULT '0',
  `mail` varchar(60) NOT NULL DEFAULT '?',
  `lnk` int(11) NOT NULL,
  `max` int(11) NOT NULL,
  `acp` int(11) NOT NULL,
  `hb` int(11) NOT NULL,
  `age` varchar(2) NOT NULL DEFAULT '?',
  `ac` varchar(100) NOT NULL DEFAULT '?',
  `it` varchar(100) NOT NULL DEFAULT '?',
  `thumb` varchar(15) NOT NULL DEFAULT '00000.png',
  `fb` varchar(50) NOT NULL DEFAULT 'sin_perfil',
  `reg` int(11) NOT NULL DEFAULT '0',
  `root` int(11) NOT NULL DEFAULT '0',
  `friends` int(11) NOT NULL DEFAULT '0',
  `freg` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ext` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `info_users`
--

INSERT INTO `info_users` (`id`, `user`, `pass`, `estado`, `sex`, `cou`, `prov`, `active`, `stt`, `priv`, `adm`, `adjunto`, `att`, `nav`, `ip`, `ttim`, `lconn`, `fij`, `mail`, `lnk`, `max`, `acp`, `hb`, `age`, `ac`, `it`, `thumb`, `fb`, `reg`, `root`, `friends`, `freg`, `ext`) VALUES
(1, 'admin', '*4ACFE3202A5FF5CF467898FC58AAB1D615029441', '', 'M', '0', 'cu', 0, 11, 255, 1, 1, 12, 'mz', 'hffdqq1abdooobl08mgu62d1n1,::1', 27380, 1534345043, 0, '?', 0, 1, 1, 0, '?', '?', '?', '00000.png', '', 1, 0, 0, '0000-00-00 00:00:00', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_vars`
--

CREATE TABLE `info_vars` (
  `id` int(11) NOT NULL,
  `var` varchar(10) NOT NULL,
  `value` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `info_vars`
--

INSERT INTO `info_vars` (`id`, `var`, `value`) VALUES
(2, 'topic', 'Chat Educativo.'),
(3, 'close', '1'),
(4, 'reason', ''),
(7, 'mudo', '0'),
(8, 'root', '0'),
(9, 'usermax', '400'),
(10, 'url', ''),
(11, 'noepty', '000');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `info_anu`
--
ALTER TABLE `info_anu`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_ban`
--
ALTER TABLE `info_ban`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_files`
--
ALTER TABLE `info_files`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_files2`
--
ALTER TABLE `info_files2`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_friend`
--
ALTER TABLE `info_friend`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_friend2`
--
ALTER TABLE `info_friend2`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_mess`
--
ALTER TABLE `info_mess`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_mess2`
--
ALTER TABLE `info_mess2`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_notif`
--
ALTER TABLE `info_notif`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_online`
--
ALTER TABLE `info_online`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_stats`
--
ALTER TABLE `info_stats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `info_users`
--
ALTER TABLE `info_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`user`);

--
-- Indices de la tabla `info_vars`
--
ALTER TABLE `info_vars`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `info_anu`
--
ALTER TABLE `info_anu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `info_ban`
--
ALTER TABLE `info_ban`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `info_files`
--
ALTER TABLE `info_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `info_files2`
--
ALTER TABLE `info_files2`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `info_friend`
--
ALTER TABLE `info_friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `info_friend2`
--
ALTER TABLE `info_friend2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `info_mess`
--
ALTER TABLE `info_mess`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `info_mess2`
--
ALTER TABLE `info_mess2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `info_notif`
--
ALTER TABLE `info_notif`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `info_online`
--
ALTER TABLE `info_online`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `info_stats`
--
ALTER TABLE `info_stats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `info_users`
--
ALTER TABLE `info_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `info_vars`
--
ALTER TABLE `info_vars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
