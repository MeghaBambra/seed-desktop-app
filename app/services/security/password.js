import crypto from 'crypto'

var config = {
  // keyLen of 16 will generate 12 words while 32 will generate 24 words
  keyLen: 16,
  // larger salt means hashed passwords are more resistant to rainbow table, but
  // you get diminishing returns pretty fast
  saltBytes: 16,
  // more iterations means an attacker has to take longer to brute force an
  // individual password, so larger is better. however, larger also means longer
  // to hash the password. tune so that hashing the password takes about a
  // second
  iterations: 100000,
  encoding: 'hex',
  digest: 'sha512'
}

/**
 * Creates a password by deriving a key of the requested byte length (keylen) from the password, salt and iterations.
 * This is in line with OpenSSL's recommendation to use PBKDF2 instead of EVP_BytesToKey.
 * @param {string} text The text from which to generate a password
 */
export const create = ({ text }, { iterations = config.iterations, keylen = config.keyLen, digest = config.digest } = {}) => {
  return new Promise(async (resolve, reject) => {
    const salt = await createRandomSalt()
    console.log(`salt: ${salt.toString(config.encoding)}`)
    crypto.pbkdf2(text, salt, iterations, keylen, digest, (err, derivedKey) => {
      if (err) {
        return reject(err)
      }
      resolve(derivedKey.toString(config.encoding))
    })
  })
}

/**
 * Creates random Salt
 */
const createRandomSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.saltBytes, (err, salt) => {
      if (err) {
        return reject(err)
      }
      resolve(salt)
    })
  })
}