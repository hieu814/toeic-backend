
const googleTranslate = require('google-translate')(process.env.TRANSLATE_API_KEY);
const translate = async (req, res) => {
    const { text, targetLanguage } = req.body;

    googleTranslate.translate(text, targetLanguage, function (err, translation) {
        if (err) {
            console.error('Translation error:', err);
            return res.status(500).json({ error: 'Translation failed' });
        }

        console.log('English:', text);
        console.log('Translation:', translation.translatedText);

        return res.status(200).json({ translation: translation.translatedText });
    });
};
module.exports = {
    translate
};