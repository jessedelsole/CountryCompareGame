export default function getLanguageName(countryCode){

    const en = global.englishLanguage;

    switch (countryCode) {

        case 1: return en ? "Portuguese" : "Português";
        case 2: return en ? "English" : "Inglês";
        case 3: return en ? "Spanish" : "Espanhol";
        case 4: return en ? "Japanese" : "Japonês";
        case 5: return en ? "French" : "Francês";
        case 6: return en ? "Italian" : "Italiano";
        case 7: return en ? "Russian" : "Russo";
        case 8: return en ? "Mandarin" : "Mandarim";
        case 9: return en ? "Hindi/Engish" : "Hindi/Inglês";
        case 10: return en ? "Norwegian" : "Norueguês";
        case 11: return en ? "Bangladesh" : "Bengali";
        case 12: return en ? "French" : "Francês";
        case 13: return en ? "Malay/English/Mandarin" : "Malaio/Inglês/Mandarin";
        case 14: return en ? "Afrikaans/English" : "Africâner/Inglês";
        case 15: return en ? "Icelandic" : "Islandês";
        case 16: return en ? "Persian" : "Persa";
        case 17: return en ? "Castilian" : "Castelhano";
        case 18: return en ? "Spanish" : "Espanhol";
        case 19: return en ? "English" : "Inglês";
        case 20: return en ? "Thai" : "Tailandês";
        case 21: return en ? "Spanish" : "Espanhol";
        case 22: return en ? "Spanish" : "Espanhol";
        case 23: return en ? "Amharic" : "Amárico";
        case 24: return en ? "English/Maori" : "Inglês/Maori";
        case 25: return en ? "Bulgaria" : "Búlgaro";
        case 26: return en ? "Arabian/Berber" : "Árabe/Bérbere";
        case 27: return en ? "English" : "Inglês";
        case 28: return en ? "English" : "Inglês";
        case 29: return en ? "Bosnia, Croatian and Serbian" : "Bósnio, croata e sérvio";
        case 30: return en ? "Germain" : "Alemão";
        case 31: return en ? "Porguguese" : "Português";
        case 32: return en ? "Burmese" : "Birmanês";
        case 33: return en ? "Greenlandic" : "Groelandês";
        case 34: return en ? "Indonesian" : "Indonésio";
        case 35: return en ? "Korean" : "Coreano";
        case 36: return en ? "Korean" : "Coreano";
        case 37: return en ? "English" : "Inglês";
        case 38: return en ? "Turkish" : "Turco";
        case 39: return en ? "Malay/English" : "Malaio/Inglês";
        case 40: return en ? "Arabic/English" : "Árabe/Tigríneo/Inglês";
        case 41: return en ? "Germain" : "Alemão";
        case 42: return en ? "Bhutanese" : "Butanês";
        case 43: return en ? "Arabic" : "Árabe";
        case 44: return en ? "Hebrew" : "Hebraico";
        case 45: return en ? "Arabic/French" : "Árabe/Francês";
        case 46: return en ? "English" : "Inglês";
        case 47: return en ? "French" : "Francês";
        case 48: return en ? "Finnish and Swedish" : "Finlandês e sueco";
        case 49: return en ? "Welsh/English" : "Galês/Inglês";
        case 50: return en ? "English/Fijian" : "Inglês/Fijiano";
    }

}