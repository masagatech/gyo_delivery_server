module.exports = function( options ) {
    var seneca = this
    var plugin = 'notify'


    seneca.add( {role:plugin, cmd:'tripstart'}, cmd_tripstart)
  

    function cmd_tripstart( args, done ) {
        //if( args.nick ) return done(null,{product:'Apple'});

        return done(null,{product:'Orange'});
    }


    return {name:plugin};
}