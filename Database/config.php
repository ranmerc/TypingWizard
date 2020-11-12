<?php
	
	class Config
	{
		private static $host="localhost";
		private static $port="5432";
		private static $dbname="typingwizard";
		private static $user="superuser";
		private static $password="1234";
		
		static	function getConnectionString()
		{
			$conn="host=". self::$host ." port=".self::$port." dbname= ".self::$dbname." user=".self::$user." password=".self::$password;
			return $conn;
			
		}
			
	}
?>