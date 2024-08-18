# Kullanım Dokümanı

Bu döküman, blockchain tabanlı bir Node.js backend uygulamasını sıfırdan klonlayıp çalıştırmak isteyen kullanıcılar için adım adım talimatlar içermektedir.

## 1. Giriş

Bu proje, Ethereum Sepolia test ağı üzerinde çalışan bir token ve ödül dağıtım sistemini kullanarak backend blockchain etkileşiminin temel kavramlarını uygulamaktadır. API istekleri Swagger ile dokümante edilmiştir.

## 2. Gereksinimler

-   **Node.js** (v14 veya üstü)
-   **npm** (v6 veya üstü)
-   **Git**

## 3. Projenin Klonlanması

Öncelikle, projeyi GitHub'dan klonlayın:

```sh
git clone https://github.com/akdoganalibugra/blockchain-api-node.git
cd blockchain-api-node
```

## 4. Gerekli Paketlerin Kurulması

Proje dizinine girdikten sonra, gerekli npm paketlerini kurun:

```sh
npm install
```

## 5. Ortam Değişkenlerinin Ayarlanması

## 5. Ortam Değişkenlerinin Ayarlanması

> Not: Bu proje test amaçlı olduğundan, örnek bir [`.env`](./.env) dosyası projeye eklenmiştir. Kendi ortamınızda projeyi çalıştırmak isterseniz, bu dosyadaki değerleri kendi ihtiyaçlarınıza göre değiştirmeniz gerekmektedir.

## 6. Akıllı Kontratların Derlenmesi ve Dağıtılması

Hardhat kullanarak akıllı kontratları derleyin ve test ağına dağıtın:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
```

Bu adım, `Reward.sol` ve `TestToken.sol` kontratlarını derleyecek ve Goerli test ağına dağıtacaktır. Dağıtım sonrası kontrat adreslerini not edin.

## 7. Backend Uygulamasının Çalıştırılması

Proje dizininde aşağıdaki komutu çalıştırarak backend uygulamasını başlatın:

```sh
npm start
```

## 8. Swagger Arayüzüne Erişim

Sunucu çalıştıktan sonra, Swagger arayüzüne [http://localhost:3000/api-docs](http://localhost:3000/api-docs) adresinden erişebilirsiniz. Bu arayüz, API'nizin tüm uç noktalarını ve bunların nasıl kullanılacağını gösterir.

## 9. API Kullanımı

### Token Gönderme

Bu adımda, kullanıcılara token ödüllendirmek için `reward-users` metodunu kullanacağız. Bu metod, kullanıcılara token ödüllendirir ve herhangi bir parametre almamaktadır. Ancak, ölçeklenebilir olup kolaylıkla parametre alacak şekilde değiştirilebilir.

### Örnek İstek

-   **URL:** `POST /api/rewards/reward-users`

```json
{
    "error": null,
    "result": {
        "address": "0x123...",
        "balance": "1000",
        "transactionHash": "0xbd3..."
    },
    "isSuccess": true,
    "statusCode": 200
}
```

Başarısız bir yanıt ise aşağıdaki gibi olacaktır:

```json
{
    "error": "Internal server error",
    "result": null,
    "isSuccess": false,
    "statusCode": 500
}
```

### Kazananları Listeleme

Ödül kontratındaki tüm kazanan kullanıcıların adreslerini listelemek için aşağıdaki API'yi kullanabilirsiniz:

-   **URL:** `GET api/rewards/winners`

#### Yanıt

Başarılı bir yanıt aşağıdaki gibi olacaktır:

```json
{
    "error": null,
    "result": ["0x123...", "0x456..."],
    "isSuccess": true,
    "statusCode": 200
}
```

Başarısız bir yanıt ise aşağıdaki gibi olacaktır:

```json
{
    "error": "Internal server error",
    "result": [],
    "isSuccess": false,
    "statusCode": 500
}
```

## 10. Testlerin Çalıştırılması

Proje dizininde aşağıdaki komutu çalıştırarak testleri çalıştırabilirsiniz:

```sh
npx hardhat test
```

## 11. Sonuç

Bu döküman, blockchain tabanlı bir Node.js backend uygulamasını sıfırdan klonlayıp çalıştırmak isteyen kullanıcılar için gerekli adımları içermektedir. Daha fazla bilgi için [`project-overview.md`](project-overview.md) dosyasına göz atabilirsiniz.

---
