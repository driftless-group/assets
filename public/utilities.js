
if (unavailableMapLibreLanguages == undefined) { 
  var unavailableMapLibreLanguages = [
    "so", "hmn"
  ];
}


function setMapLanguage(languageCode) {
  if (unavailableMapLibreLanguages.indexOf(languageCode) > -1) {
    languageCode = 'en';
  }

  map.setLayoutProperty('label_country', 'text-field', [
    'get', `name:${languageCode}`
  ]);
  
  map.setLayoutProperty('label_city', 'text-field', [
    'get', `name:${languageCode}`
  ]);
}
