module.exports = {
    header: {
        height: '50px',
        contents: function(page, noofpages) {
            return '<header class="pdf-header" style=" overflow:hidden; font-size: 10px; padding: 10px; margin: 0 -15px; color: #fff; background: none repeat scroll 0 0 #00396f;"><p> XYZ ' + page + '</p></header>'
        }
    },

    footer: {
        height: '2cm',
        contents: function(page, noofpages) {
            return '<footer class="pdf-footer" style="font-size: 10px; margin: 0 -15px;  font-weight: bold; color: #000;background: none repeat scroll 0 0 #00396f;""><p style="margin: 0">Powered by XYZ</p></footer>'
        }
    },

}