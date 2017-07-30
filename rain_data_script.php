<?php
ini_set('max_execution_time', 0);

$con = mysqli_connect("localhost","root","");
mysqli_select_db($con, "govhack");

$opts = array(
    'http' => array(
        'header' => "Content-type: application/xml"
    )
);
$context = stream_context_create($opts);
$xmlFile = file_get_contents("http://data.hbrc.govt.nz/Envirodata/EMAR.hts?service=Hilltop&Request=SiteList&Location=LatLong",NULL,$context) or die("Error");
//header("Content-type: application/xml");
$stations = simplexml_load_string($xmlFile);
echo $stations;

foreach ($stations ->Site as $site) {
	usleep(1000000);
	$xmlFile = file_get_contents("http://data.hbrc.govt.nz/Envirodata/EMAR.hts?service=Hilltop&request=GetData&Site=" .
	urlencode($site['Name']) . "&Measurement=Rainfall",NULL,$context) or die("Error");
	$siteMap = simplexml_load_string($xmlFile);
	if(isset($siteMap->Measurement)) {
		echo $site['Name']." - Rainsite</br>";
	}
}
//echo $stations;
//foreach($station.Site as $site)
//{
//}
//("insert into sitemap(name,lat,lng)values("+$Site.Name+","+$Site.Latitude+","+$Site.Longitude+");")


$con->close();
?>