const express=require('express')
const { translate } = require('@vitalets/google-translate-api');
require('dotenv').config()
const app=express()
const PORT=process.env.PORT
app.use(express.json())
app.get('/',(req,res)=>
{
    res.status(200).json({'server':'server is listing'})
})
app.post('/translate', async (req, res) => {
    try {
      const { text } = req.body;
  
      // Check if 'text' is provided in the request body
      if (!text) {
        return res.status(400).json({ error: 'Text to translate is required.' });
      }
  
      // Perform translation
      const translation = await translate(text, { to: 'fr' });
  
      res.status(200).json({ translation: translation.text });
    } catch (error) {
      console.error('Translation error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT,()=>
{
    console.log(`server listing at ${PORT} `)
})