const mongoose = require('mongoose');
const marked = require('marked');
const createDomPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const domPurify = createDomPurify(new JSDOM().window)

const postSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    markdown: {
        required: true,
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    sanitizedHtml:{
        type: String,
        required: true
    }
})

postSchema.pre('validate', function(next){
    
    if(this.markdown){
        this.sanitizedHtml = domPurify.sanitize(marked(this.markdown));
    }
    next()
})

module.exports = mongoose.model('Post', postSchema);