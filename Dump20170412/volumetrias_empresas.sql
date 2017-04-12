-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: volumetrias
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(250) DEFAULT NULL,
  `rfc` varchar(13) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_grupo` (`id_grupo`),
  CONSTRAINT `empresas_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=274 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,NULL,'ABC991012BF0',7),(2,NULL,'CCS090723I81',8),(3,NULL,'CIC0310274C8',10),(4,NULL,'PES080229EPA',10),(5,NULL,'BTR040812MG5',10),(6,NULL,'VSB080807AWA',10),(7,NULL,'SLB100710189',10),(8,NULL,'PME760707KW3',14),(9,NULL,'RME801118SK4',14),(10,NULL,'CAU861219EK2',14),(11,NULL,'LLI001220J61',14),(12,NULL,'SCM110106V4A',14),(13,NULL,'ENI100212A92',14),(14,NULL,'BIN150305H25',14),(15,NULL,'NACA771127KG0',14),(16,NULL,'NACM790818P17',14),(17,NULL,'NACP810603VBA',14),(18,NULL,'CAMS550721PX5',14),(19,NULL,'NAFP510503546',14),(20,NULL,'ASI090205421',17),(21,NULL,'ASI8911134E8',17),(22,NULL,'ASS950310QW1',17),(23,NULL,'BME940711FR5',3),(24,NULL,'TPA941215PM1',3),(25,NULL,'CPL7509051LA',18),(26,NULL,'ASE001129LB6',19),(27,NULL,'AAS040901BV0',19),(28,NULL,'PAC120605V77',19),(29,NULL,'AIF050114QM3',20),(30,NULL,'AIL0501146I3',20),(31,NULL,'DMA850716ER5',20),(32,NULL,'GMA8108184L9',20),(33,NULL,'HSI060601C95',20),(34,NULL,'IFI890602QV0',20),(35,NULL,'IFM060601554',20),(36,NULL,'IJE830507UN3',20),(37,NULL,'ILC8610036R4',20),(38,NULL,'IMS810818B70',20),(39,NULL,'IOG080619EK9',20),(40,NULL,'ISP061221C8A',20),(41,NULL,'PIM8212089C7',20),(42,NULL,'SAM011217V64',20),(43,'SERVICIOS DEPORTIVOS PARA LATINOAMERICA SA DE CV','SDL110825JF0',21),(44,'LATAMGYM S.A.P.I DE C.V','LAT110824BJ4',21),(45,'Metro Net Hosting S. de R.L. de C.V.','MNH0004267T8',33),(46,'Metronet SAPI de CV','MNE960503876',55),(47,'Operadora Metronet S. de R.L. de C.V.','OME991216876',55),(48,'Sixsigma Networks México S.A. de C.V.','SNM010323EB5',33),(49,'ARRENDANAY S.A. DE C.V.','ARR870701E11',22),(50,'AUTOMOTRIZ DE NAYARIT S.A. DE C.V.','ANA660301DM5',22),(51,'DISTRIBUIDORA ALIMENTARIA ALICA S.A. DE C.V.','DAA1405264X2',22),(52,'DISTRIBUIDORA ALIMENTARIA CARSE S.A. DE C.V.','DAC0411052J3',22),(53,'FUNDACION ALICA DE NAYARIT A.C.','FAN900512SD5',22),(54,'GRUPO EMPRESARIAL ALICA S.C.','GEA921218858',22),(55,'HENKA SERVICIOS ESPECIALIZADOS S.A. DE C.V.','HSE090602FU8',22),(56,'IMPULSORA DEPORTIVA DEL VALLE DE TEPIC S.A. DE C.V.','IDV850316SF5',22),(57,'IMPULSORA Y FOMENTO ALICA SAPI DE C.V. SOFOM ENR','IFA0907089P1',22),(58,'PROMOTORA DE INVERSIONES DEL NAYAR S.A. DE C.V.','PIN8403281M9',22),(59,'PUERTO VALLARTA MOTORS S.A. DE C.V.','PVM690411GI9',22),(60,'SERVICIOS DE TEPIC S.A. DE C.V.','STE870112NX0',22),(61,'ALICIA BOURLON PLIEGO','BOPA510714IQ3',23),(62,'ANDAMIOS Y PARARRAYOS SA DE CV','APA840130HH2',23),(63,'Arrendadora Pade S.A. de C.V.','APA890808557',23),(64,'BEPG Asociados S. C.','BAS8906261H1',23),(65,'Constructora de Pararrayos S.A. de C.V.','CPA810305PJ9',23),(66,'Negociadora de Inmuebles Pade S.A. de C.V.','NIP8610218UA',23),(67,'PAOLA ANNE BOURLON BOURLON','BOBP870611DY5',23),(68,'Promotora y Comercializadora de Pararrayos S.A. de C.V.','PCP0108213V3',23),(69,'REASEF S. C.','REA050209UL4',23),(70,'NEPADE PUEBLA S.A. de C.V.','NPU140819LT0',23),(71,'PLAZA LOPEZ COTILLA S.A. DE C.V.','PLC020415UL9',24),(72,'PASAJE DE ELECTRONICA EL SALVADOR S.A. DE C.V.','PES870324883',24),(73,'ASIGNA  COMPENSACION Y LIQUIDACION F/30430 FISO BANCOMER S.A.','ACL981211AQA',68),(74,'ASOCIACION MEXICANA DE INTERMEDIARIOS BURSATILES A.C.','AMI9306213R0',68),(75,'BOLSA MEXICANA DE VALORES S.A.B. DE C.V.','BMV760203JD4',68),(76,'BURSATEC S.A. DE C.V.','BUR981231RS3',68),(77,'CONTRAPARTE CENTRAL DE VALORES DE MEXICO S.A. DE C.V.','CCV040120SQA',68),(78,'CORPORATIVO MEXICANO DEL MERCADO DE VALORES S.A. DE C.V.','CMM011115Q58',68),(79,'INTERGLOVAL BMV S.A. DE C.V.','IBM100802QR3',68),(80,'MEXDER MERCADO MEXICANO DE DERIVADOS S.A. DE C.V.','MMM980818CS9',68),(81,'S.D. INDEVAL INSTITUCION PARA EL DEPOSITO DE VALORES S.A. DE C.V.','SDI870821SXA',68),(82,'VALUACION OPERATIVA Y REFERENCIAS DE MERCADO SA DE CV','VOR000810G91',68),(83,'BUMERAN COM MEXICO SA DE CV','BCM000307DY2',25),(84,'DRIDCO MEXICO SA DE CV','DME080825AX6',25),(85,'MERCADO IM SA DE CV','MIM080611G35',25),(86,'Soluser Soluciones y Servicios SA de CV','SSS110422MBA',25),(87,'TECNOLOGIA PARA INMOBILIARIAS S.A. DE C.V.','TIN120120RA4',25),(88,'Cajaplax S.A. de C.V.','CPL7509051LA',18),(89,'PROMOCIONES TURISTICAS AV SA DE CV','PTA7201107VA',56),(90,'PROMOCIONES TURISTICAS COSTA BAJA SA DE CV','PMC030409BB4',56),(91,'CRUZ ROJA MEXICANA IAP','CRM6702109K6',53),(92,'Comercial Diecisiete SA de CV','CDI070125994',27),(93,'Grupo Dicanco S.A. de C.V.','GDI000808169',27),(94,'IMPORTADORA FERMIN SA DE CV','IFE0707071P5',27),(95,'Importadora Speed Tank S.A. de C.V.','IST080721N96',27),(96,'Importadora Taxco Hermanos','ITH0807212U1',27),(97,'Productos Dicanco S.A. de C.V.','PDI060106HK2',27),(98,'Representaciones Dicanco S.A. de C.V.','RDI010909QA3',27),(99,'Shoes High End S.A. de C.V.','SHE0808185G1',27),(100,'Tenis Frontera S.A. de C.V.','TFR040305FS4',27),(101,'Trendy Imports S.A. de C.V.','TIM050307ST4',27),(102,'IMPORTADORA STEVE MADDEN MEXICO S. DE R.L. DE C.V.','ISM140923ADA',27),(103,'COMERCIALIZADORA FARMA VITA S.A.P.I. DE C.V.','CFV140402QD8',29),(104,'FARMACIAS SAN FRANCISCO DE ASIS S.A. DE CV.','FSF910327HH4',29),(105,'ALIMENTOS CALIENTES DE MERIDA S.A. DE C.V.','ACM960207QE1',30),(106,'ALIMENTOS INTERMEX  S.A. DE C.V.','AIN990917988',30),(107,'ALIMENTOS SIGLO XXI','ASX920608KX9',30),(108,'CORPORATIVO EMPRESARIAL DE LA COSTA S.C.','CEC061205V23',30),(109,'EQCO S.A. DE C.V.','EQC000504AW2',30),(110,'GRILL ALIMENTOS S.A. DE C.V.','GAL000616DL5',30),(111,'GRILO ALIMENTOS S.A. DE C.V.','GAL110622T60',30),(112,'GRUPO MONSERRAT S.A. DE C.V.','GMO0304242V0',30),(113,'JUCEGARE S DE R.L. DE C.V.','JCV940317B14',30),(114,'LA QUINTA FAST FOOD S. DE R.L. DE C.V.','QFF9407291FA',30),(115,'N&B Alimentos del Pacífico S. de R.L. de C.V.','NAP040520NE2',30),(116,'NEGRECAR S.A. DE C.V.','NEG990914166',30),(117,'NORTE ALIMENTOS Y SERVICIOS RAPIDOS S.A. DE C.V.','NAS010724DG5',30),(118,'Operadora Alma S. de R. L. de C. V.','OAC920723E74',30),(119,'Peninsula Alimentos Express S.A. de C.V.','PAE000904MI6',30),(120,'PROMOTORA MEXICANA DE SERVICIOS Y ALIMENTOS  S.A DE C.V','PMS990917GJA',30),(121,'QUALIFOOD S.A. DE C.V.','QUA001025D92',30),(122,'VERAFOOD S. DE R.L. DE C.V.','VER920215PW7',30),(123,'VIVCO Alimentos S. de R.L. de C.V.','VAL901115TZ8',30),(124,'Interplanet S.A. de C.V.','INT951107UC0',32),(127,'Metro Net S.A.P.I. de C.V.','MNE960503876',33),(128,'Fundación Kio AC','FKI130429789',1),(129,'PR DE EMPRESAS','PEM1108028CA',1),(130,'Asociación Programa Lazos I.A.P','APL970131TQ5',34),(131,'ITALY SPORTS PRODUCTS S.A DE C.V','ISP061221C8A',35),(132,'DEPORTES MARTI S. A. DE C.V.','DMA850716ER4',35),(133,'CORPORACION SPORT CITY SA DE CV','CSC131203250',36),(134,'GRUPO SPORT CITY S.A. DE C.V.','GSC011114FM0',36),(135,'SERVICIOS CORPORATIVOS SPORT CITY S.A. DE C.V.','SCS0308157T1',36),(136,'SPORT CITY S.A. DE C.V.','SCI011114UY7',36),(137,'SPORT CITY CUERNAVACA S.A. DE C.V.','SCC000704F47',36),(138,'SPORT CITY CANCUN S.A DE C.V.','SCC020213N20',36),(139,'SPORT CITY LOMAS VERDES S.A. DE C.V.','SCL040705PX8',36),(140,'SPORT CITY METROPOLITANO S.A. DE C.V.','SCM020213U95',36),(141,'SPORT CITY MONTERREY S.A. DE C.V.','SCM001030C39',36),(142,'SPORT CITY NUTRITION S.A. DE C.V.','SCN041215CJ1',36),(143,'SPORT CITY PACHUCA S.A. DE C.V.','SCP071106CR2',36),(144,'SPORT CITY QUERETARO S.A. DE C.V.','SCQ0109205Z7',36),(145,'SPORT CITY SALTILLO S.A. DE C.V.','SCS090514IJ8',36),(146,'SPORT CITY UNIVERSIDAD S.A. DE C.V.','SCU030806A19',36),(147,'SPORT QUIMOC METEPEC S.A. DE C.V.','SQM070119T60',36),(148,'Administracion Integral Firpo Izcalli SA de CV','AIF050114QM3',37),(149,'Administracion Integral Larca Coapa SA de CV','AIL0501146I3',37),(150,'Deportes Marti SA de CV','DMA850716ER5',37),(151,'Grupo Marti SA de CV','GMA8108184L9',37),(152,'Icon Fitness de Mexico S.A de C.V','IFM060601554',37),(153,'Inmobiliaria Firpo Izcalli SA de CV','IFI890602QV0',37),(154,'Inmobiliaria Larca Coapa SA de CV','ILC8610036R4',37),(155,'Inmobiliaria Marti de Santa Ursula Tlalpan SA de CV','IMS810818B70',37),(156,'Inmuebles de Oaxaca Grupo Marti SA de CV','IOG080619EK9',37),(157,'Inmuebles Jeny SA de CV','IJE830507UN3',37),(158,'Italy Sports Products S. A. de C. V.','ISP061221C8A',37),(159,'Pro Italy Mark S.A de C.V','PIM8212089C7',37),(160,'Servicios Administrativos Marti SA de CV','SAM011217V64',37),(161,'MASNEGOCIO COM S A P I DE CV','MCO000823CK3',38),(162,'NEGOCIO MAS S.A. DE C.V.','NMA0008237B9',38),(163,'Arcos Sercal Inmobiliaria A en P','ASI8911134E8',39),(164,'Arcos Sercal Inmobiliaria S De RL CV','ASI090205421',39),(165,'FUNDACION MICHOU Y MAU I.A.P.','FMM9804231L5',40),(166,'MICHU Y MAU AC','MMA110324JW5',40),(167,'MARIA MAGDALENA PEREA RABLING','PERM610915RW6',41),(168,'MULTISERVICIOS LA QUINTA S.C.','MQU030819165',41),(169,'GRUPO OUT HELPING S A DE CV','GOH0402248U1',6),(170,'OUT HELPING COMERCIAL S.A. DE C.V.','OHC99020984A',6),(171,'OUT HELPING INDUSTRIAL SA DE CV','OHI990209N28',6),(172,'OUT HELPING SC','OHE9810199N1',6),(173,'OUT HELPING SERVICIOS SA DE CV','OHS030515S57',6),(174,'CONFIANZA EN SERVICIOS DE PAYROLLING S DE RL DE CV','CSP081106N79',42),(175,'EQUIPO ESTRATEGICO DE PERSONAL SA DE CV','EEP091002CQ3',42),(176,'RED OFFICE S DE RL DE CV','ROF091218F55',42),(177,'RED PARTNER S DE RL DE CV','RPA1003045L6',42),(178,'COMPAÑIA ALTERNATIVA PLURAL','APL130508B82',42),(179,'CENTRO ESPECIALIZADO EN RECLUTAMIENTO S.A. DE C.V.','CER060712UE3',42),(180,'COMERCIO CENTRO SIETE S.A. DE C.V.','CCS121109MD8',42),(181,'CAPACIDAD EN RECURSOS HUMANOS S.A. DE C.V.','CRH121121GC4',42),(182,'GLODEME ASESORIAS','GAS121214IB7',42),(183,'MERCADO GLOBAL FINANCIERO ALTERNATIVO GLOFIAL','MGF121210622',42),(184,'SOLUCIONES INTEGRALES DE LOGISTICA EXPRESS LOGISTEX','SLI121204PX6',42),(185,'GRUPO ROTOPLAS SA DE CV','GRO930330S66',43),(186,'ROTOPLAS BIENES RAICES SA DE CV','RBR480301NI9',43),(187,'ROTOPLAS DE LATINOAMERICA SA DE CV','RLA010430L15',43),(188,'ROTOPLAS RECURSOS HUMANOS SA DE CV','RRH930810LIA',43),(189,'ROTOPLAS S.A DE C.V','ROT7802026ZA',43),(190,'SERVICIOS ROTOPLAS SA DE CV','SRO930607G29',43),(191,'ROTOPLAS COMERCIALIZADORA SA DE CV','RCO930607IF0',43),(192,'SERVICIOS EMPRESARIALES DE ALTA CALIDAD SA DE CV','SEA040112AU6',44),(193,'SOLUCIONES EN RH AVANT S. A. DE C. V. SOFOM ENR','SRA0506271E4',44),(194,'SOLUCIONES INTEGRALES A SU CENTRO DE CONTACTO SA DE CV','SIS030114FKA',44),(195,'TRENDY IMPORTS  S. DE R.L. DE C.V.','TIM050307ST4',45),(196,'COMERCIAL DIECISIETE S. DE R.L. DE C.V.','CDI070125994',45),(197,'Synthes SMP S de RL de CV','SSM900628FV3',46),(198,'FUNDACION DE REHABILITACION INFANTIL TELETON Â A.C.','FRI981116A41',47),(199,'FUNDACION INTEGRAL PARA EL DESARROLLO SOCIAL I.A.P.','FID060208EH9',47),(200,'FUNDACION MEXICO UNIDO A.C.','FMU940922RYA',47),(201,'FUNDACION TELETON I.A.P.','FTI971104AY4',47),(202,'FUNDACION TELETON MEXICO A.C.','FTM981104540',47),(203,'PROMOTORA DE ASISTENCIA A.C.','PAS990325666',47),(204,'FUNDACION DE REHABILITACION INFANTIL TELETON Â A.C.','FRI981116A41',48),(205,'FUNDACION DE REHABILITACION INFANTIL TELETON A.C.','FRI981116A41',49),(206,'Wingu Networks S.A. de C.V','WNE1203015A1',50),(207,'INDUSTRIAL PERFORADORA DE CAAMPECHE S.A. DE C.V.','ATM940922626',51),(208,'L.R.H.G. INFORMATIVO S.A. DE C.V.','GAU961002782',51),(209,'SERVICIO INDUSTRIAL ESPECIALIZADO S.A. DE C.V.','ANM130506ML7',51),(210,'SERVICIOS DE PERSONAL CINEMAS S.A. DE C.V.','SPC071025V65',52),(211,'CINEPOLIS DE MEXICO SA DE CV','CME981208VE4',52),(212,'SERVICIOS DE PERSONAL CINEPOLIS SA DE CV','SPC070905UG6',52),(213,'TENEDORA DE CINES SA DE CV','TCI121023F10',52),(214,'COMERCIALIZADORA PUBLICITARIA TIK','CPT1409023G9',52),(215,'SERVICIOS DE CINEPOLIS SA DE CV','SCI990106SQ9',52),(216,'NEGOCIOS ALTERNOS CPL','NAC141216M96',52),(217,'SERVICIOS DE CINEMAS SA DE CV','SCI981229TF3',52),(218,'OPERADORA COMERCIAL DE DESARROLLO','OCD051219680',52),(219,'CONSTRUCTORA Y ARRENDADORA MEXICO S.A. DE C.V.','CAM840907KT4',54),(220,'IMPRESORA DE PERIODICOS DIARIOS S DE RL DE CV','IPD1101104SA',54),(221,'INDUSTRIAL PERFORADORA DE CAAMPECHE S.A. DE C.V.','IPC8508013F2',54),(222,'L.R.H.G. INFORMATIVO S.A. DE C.V.','LIN090430G34',54),(223,'SERVICIO INDUSTRIAL ESPECIALIZADO S.A. DE C.V.','SIE830909RS0',54),(224,'SERVICIOS MARITIMOS DE CAMPECHE S.A. DE C.V.','SMC861113Q66',54),(225,'RIO SAN JUAN CONSTRUCCIONES S.A. DE C.V.','RSJ9012112B1',54),(226,'AEROSERVICIOS DINAMICOS S.A. DE C.V.','ADI9704109EA',54),(227,'SERVICIOS Y MAQUINARIA DE MEXICO S.A. DE C.V.','SMM901213EF4',54),(228,'AEROLINEAS CENTRALES S.A. DE C.V.','ACE010809RN4',54),(229,'GRUPOR EXPLORACION MARINA ','GRE090525DUA',54),(230,'HOTELERA POSADA DE CAMPECHE','HPC130930M48',54),(231,'GRUPOR PERFORACION MARINA','GRP090522H22',54),(232,'SERVICIOS CARRETEROS NACIONALES','SCN930113GZ1',54),(233,'DESARROLLO Y SERVICIO PETROLERO SA DE CV','DSP8912113V2',54),(234,'CRUZ ROJA MEXICANA IAP','CRM6702109K6',53),(235,'INNOVACION EN LOGISTICA Y DISTRIBUCIÓN S.A. DE C.V.','ILD041028IT1',31),(236,'SERVICIOS ROTOPLAS S.A. DE C.V. SRO','SRO930607G29',43),(237,'ROTOPLAS RECURSOS HUMANOS S.A. DE C.V.','RRH930810LIA',43),(238,'PRESTAMOS PRENDARIOS DEPOFIN S.A. DE C.V.','PPD9606045N1',58),(239,'PRENDAMEX S.A. DE C.V.','PRE030926CQ9',58),(240,'SUPERPRESTAMO PREMIER S.A. DE C.V.','SPR0403083WA',58),(241,'ZEPEDA OLIVARES Y ASOCIADOS S.C.','ZAC120720IU6',58),(242,'PAREDA Y ASOCIADOS CONTADORES S.C.','PAC120717BT5',58),(243,'SERVICIOS ALTERNATIVOS TAYSER S.A. DE C.V.','SAT010115E51',58),(244,'BARCOS Y OPERACION DE ATRACTIVOS TURISTICOS S.A. DE C.V.','BOA070927J73',56),(245,'ESTACION DE SERVICIO COSTA BAJA SA DE CV','ESC030917QU0',56),(246,'HSBC MEXICO SA I.B.M. DIV. FID. F/251704','HMA080515P16',56),(247,'INMOBILIARIA POSADAS DEL MAR SA DE CV','IPM820518NX1',56),(248,'MARINA COSTA BAJA S.A. DE C.V.','MCB030409FZ0',56),(249,'OPERADORA DE HOTELES COSTA BAJA S.A. DE C.V.','OHC030409R41',56),(250,'Arbol Sport S.A. de C.V.','ASP041015TC6',27),(251,'ArtÍculos Dieciocho S.A. de C.V.','ADI0606064L3',27),(252,'Comercial Dicanco S.A. de C.V.','CDI050505UU6',27),(253,'Comercial Diecisiete SA de CV','CDI070125994',27),(254,'Grupo Dicanco S.A. de C.V.','GDI000808169',27),(255,'IMPORTADORA FERMIN SA DE CV','IFE0707071P5',27),(256,'Importadora Speed Tank S.A. de C.V.','IST080721N96',27),(257,'Importadora Taxco Hermanos','ITH0807212U1',27),(258,'Productos Dicanco S.A. de C.V.','PDI060106HK2',27),(259,'Representaciones Dicanco S.A. de C.V.','RDI010909QA3',27),(260,'Shoes High End S.A. de C.V.','SHE0808185G1',27),(261,'Tenis Frontera S.A. de C.V.','TFR040305FS4',27),(262,'Trendy Imports S.A. de C.V.','TIM050307ST4',27),(263,'IMPORTADORA STEVE MADDEN MEXICO S. DE R.L. DE C.V.','ISM140923ADA',27),(264,'NSK BEARINGS MANUFACTURING MEXICO SA DE CV','DLC100224LR1',57),(265,'NSK WARNER MEXICO SA DE CV','NME16070647A',57),(266,'NSK RODAMIENTOS MEXICANA SA DE CV','NSK900403AT2',57),(267,'NSK SERVICIOS DE MEXICO SA DE CV','NSM060403HN8',57),(268,'RESTAURANTES ADMX, S. DE R.L. DE C.V.','RAD161031RK1',39),(269,'Asys, S.C.','ASY971222TH5',41),(270,'CONSORCIO COMERCIAL LA QUINTA, S.A. de C.V.','CCQ850528J75',41),(271,'Hector Sistos Rangel','SIRH481001E75',41),(272,'VERAFOOD S. DE R.L. DE C.V.','VER920215PW7',41),(273,'DEDICACION Y CAPACITACION PERSONALIZADA SA DE CV','DCP120824D50',42);
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-12 17:23:16
