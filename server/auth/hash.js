const sodium = require('sodium').api

function generate(password){
    const passwordBuffer = Buffer.from(password, 'utf8')
    return sodium.crypto_pwhash_str(
        passwordBuffer,
        sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
        sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
    )
}

function verifyUser(hash, password){
    const buffer = Buffer.from(password, 'utf8')
    return sodium.crypto_pwhash_str_verify(hash, buffer)
}

module.exports = {
    generate,
    verifyUser
}