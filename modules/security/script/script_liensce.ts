import * as NodeRsa from 'node-rsa';

export class LiensceGenerator {
  /**
   * curve used to generate keys
   *
   * @static
   * @memberof LiensceGenerator
   */
  static curveName = 'secp256k1';

  /**
   * Encoding to read and write keys
   *
   * @static
   * @memberof LiensceGenerator
   */
  static encoding = 'base64';

  /**
   * method to create new key sets
   *
   * @static
   * @returns
   * @memberof LiensceGenerator
   */
  static get privateKey() {
    return new NodeRsa(
      `-----BEGIN RSA PRIVATE KEY-----
      MIIEpAIBAAKCAQEAvE6ApBR6jW1z57XjiNfNKi5YfkuvLggob2rTmxraLqu3PEyc
      cgB5yk6DdjIY0BadhiRMwMiSWVik8Vk1Va+nKxjrx0scS4oTvXdxdBEfNl2wXExm
      8EtqdhRc5m9qPLlw0YIK9UK7zrCVBtbYAHCQgTuAcAmvnk+23Zbyg3sWHXzMNMgQ
      ggYthppJxj1bSQvAg53Q01ktYUGWB533X0kjsjnfu2+CK4IKtBH70RwhDKDxQG6D
      bSn0QFdxXAAi+raegAvmfcpW3SQVpd14iBYl+meMnO68OK+rN2wVlh8vMCAb2M+M
      88HkrElmBFC/D7yqG1k+VNkh4xoczmVH8J+8RQIDAQABAoIBAQCPwCX4HCIKQRoQ
      MwxF9OgMYWDw2PocW+HyXEy5xV/17ORuxdVQOgi/Zfx5iHjksb8DHkbxjKwcRM11
      6TIL/ZHSFq43b6FkET5MjxgvELsRF6iAbVrP6eKVzam1yCwDu1TiuzF+Vbllaev6
      UpyGiWfnH/NGlD5azmO8+XSc5qPVUZPSm10jCB62MBIGEFcZLEz4nboATyZHp1bI
      0W0aCUbFni2UpDxWUO2IDNNKLkqz0P68DAGNUGC4uWCkVEzTg6l827gkNrwP+OGq
      5WH4NJSG3bCtVNy5gOljUgemyAMxSRuDAsRv8tEB+OrpHdtjz7imhSsBlJ35My6e
      LniOX62BAoGBAPnf9szaUBT5cxg5wXDM8dYCiVpiO/7aaLTUvoYAUlEZURSlJ/ao
      LsRmthCJ7XP8mrcbZndtFfBzDkkiJ5GyUtgOQE+iZ43bM8nLnBBpm3EXSJcrZIbo
      PfheZEZDjGq4n3ANPxH+DR9g3+s1ctbQ6AbFq6ozdN0HPDM27zrn/dj1AoGBAMDs
      Li3F6kzVp+82UsUXvag0X6MvIWKFWEIfcAmXlg6vmmqROuF0QSv0iZ3aj/HAb+jM
      9H31My/fnTYIbpxGXwWDXFJXdOsNUFpn/9Le3OLxQLZd9GJfPoEZjDiFwSr7pAPG
      alIx1Xkj8L8RV5CS2utUIjdjKqeV+VHWRV/5joQRAoGAOPwsqrc3ADGLYAD77p+u
      n2HgtS4mBI8GxgamlKTKIRim9xBbNtNQJxZNeyQZdRQsrImhKqdEE5wJrAAQChgi
      8Ib/f6nH9///pYu7wbpz6qymr2MEAAhC6buNHsEU6tnD8qfytEW99GQBbQC5eegW
      okS+S4iEpEucHQnwMPzrVWkCgYAOwcIihDIQ4ILw/FHGe7NpK2BpZhCCrbp7jFYQ
      lcTHqM0B+8vqNO9LQnBIX9CE6Hhm8U5+WAQrVEp9OJXlZEieblbggYoS9LjBwZTC
      94Mj5NpTWMp5v9lTHLYqGKkW9ZqtIz88vE0c8A/ZPaVaDLGsMIpRfEdl/EXO6bny
      xm8NUQKBgQCfDvveLYdk8LgNjC1Tta2bOATUP3nnb/Hs3ZNI0zPHi9hJ2UiVTFcE
      WSF0pON1cYmpx61VMGIWomLluUlgHu2EJXmrlxXLh7ZVIu1KNwYV37X7Mk0rQVuN
      ADNg/thXX4/fZN3ZriMhtI6PZv4WHwxG7oo+56EQ8jwbtsUMb7PxDA==
      -----END RSA PRIVATE KEY-----
      `,
      'pkcs1-private'
    );
  }

  static privateEncrypt(secret) {
    return this.privateKey.encrypt(secret, 'base64');
  }

  static get publicKey() {
    return new NodeRsa(
      `-----BEGIN RSA PUBLIC KEY-----
    MIIBCgKCAQEAvE6ApBR6jW1z57XjiNfNKi5YfkuvLggob2rTmxraLqu3PEyccgB5
    yk6DdjIY0BadhiRMwMiSWVik8Vk1Va+nKxjrx0scS4oTvXdxdBEfNl2wXExm8Etq
    dhRc5m9qPLlw0YIK9UK7zrCVBtbYAHCQgTuAcAmvnk+23Zbyg3sWHXzMNMgQggYt
    hppJxj1bSQvAg53Q01ktYUGWB533X0kjsjnfu2+CK4IKtBH70RwhDKDxQG6DbSn0
    QFdxXAAi+raegAvmfcpW3SQVpd14iBYl+meMnO68OK+rN2wVlh8vMCAb2M+M88Hk
    rElmBFC/D7yqG1k+VNkh4xoczmVH8J+8RQIDAQAB
    -----END RSA PUBLIC KEY-----`,
      'pkcs1-public'
    );
  }

  static publicDecrypt(secret) {

    return this.privateKey.decrypt(secret, 'utf8');
  }

  static generateDemoKey() {
    const bio = {
      apikey: 'apikey',
      globalId: '123random5xyz',
      schoolId: 'schoolId',
      schoolName: 'testing school',
      timestamp: '06-07-17'
    };
    return LiensceGenerator.privateEncrypt(bio);
  }
}

const _s = LiensceGenerator.generateDemoKey();
console.log(_s);
