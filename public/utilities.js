var unavailableMapLibreLanguages = [
  "so"
];


function setMapLanguage(languageCode) {
  if (unavailableMapLibreLanguagues.indexOf(languageCode) > -1) {
    languageCode = 'en';
  }

  map.setLayoutProperty('label_country', 'text-field', [
    'get', `name:${languageCode}`
  ]);
  
  map.setLayoutProperty('label_city', 'text-field', [
    'get', `name:${languageCode}`
  ]);
}
