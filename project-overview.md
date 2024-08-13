## **Gereksinim & Gerçekleştirme Dokümanı**

### **1. Giriş**

Bu doküman, blockchain tabanlı bir Node.js backend uygulamasının geliştirilmesi için gerekli olan gereksinimleri, gerçekleştirme adımlarını ve genel bir planlamayı detaylandırmaktadır. Amaç, bir test ağı üzerinde çalışan bir token ve ödül dağıtım sistemini kullanarak backend blockchain etkileşiminin temel kavramlarını uygulamak ve API isteklerini Swagger ile yayınlayarak sistemin kullanılabilirliğini artırmaktır.

### **2. Genel Gereksinimler**

-   **Node.js:** Uygulamanın backend kısmı Node.js ile geliştirilecektir.
-   **Blockchain Platformu:** Bir test ağı üzerinde çalışan Ethereum uyumlu bir blockchain platformu (Goerli, Sepolia, vb.) kullanılacaktır.
-   **Solidity:** Akıllı kontratlar Solidity programlama dili ile yazılacaktır.
-   **Web3.js:** Node.js uygulamasından blockchain ile etkileşim için Web3.js kütüphanesi kullanılacaktır.
-   **Swagger:** API dokümantasyonu için Swagger (OpenAPI Specification) uyumlu bir araç (örn. Swagger UI) entegre edilecektir.

### **3. Akıllı Kontratlar**

-   **Token Kontratı:**

    -   ERC-20 standardına uygun bir token kontratı oluşturulacaktır.
    -   Token'ın toplam arzı, ondalık basamak sayısı gibi parametreler belirtilecektir.

-   **Ödül Kontratı:**
    -   Token kontratına referans verecek şekilde bir ödül kontratı oluşturulacaktır.
    -   Ödül alacak kullanıcıların adreslerini saklamak için bir array veya mapping kullanılacaktır.
    -   Bir kullanıcının ödül alıp almadığını kontrol etmek için bir fonksiyon tanımlanacaktır.
    -   Ödül dağıtımı için bir fonksiyon tanımlanacaktır.

### **4. Node.js Backend**

-   **Web3.js ile Bağlantı:**

    -   Seçilen blockchain ağına Web3.js ile bağlanılacaktır.
    -   Akıllı kontratların ABI'leri Node.js uygulamasına dahil edilecektir.

-   **API İşlemleri:**

    -   **Token Gönderme:**

        -   Kullanıcı tarafından belirtilen cüzdanlara belirli miktarda token göndermek için bir API oluşturulacaktır.
        -   Token gönderme işlemi başarılı olursa, alıcının adresi ödül kontratındaki kazananlar listesine eklenecektir.

    -   **Kazananları Listeleme:**
        -   Ödül kontratındaki tüm kazanan kullanıcıların adreslerini listelemek için bir API oluşturulacaktır.
        -   Listelenen kullanıcılar JSON formatında döndürülecektir.

-   **Swagger Entegrasyonu:**
    -   API'lerin dokümantasyonu için Swagger UI veya benzeri bir araç kullanılarak bir arayüz oluşturulacaktır.

### **5. Gerçekleştirme Adımları**

1. **Geliştirme Ortamının Hazırlanması:**

    - Node.js ve gerekli paketlerin kurulması.
    - Blockchain test ağına erişim sağlanması.

2. **Akıllı Kontratların Yazılması ve Dağıtılması:**

    - Solidity ile `Token` ve `Reward` akıllı kontratlarının yazılması.
    - Kontratların derlenmesi ve test ağına dağıtılması.
    - Kontratların adreslerinin kaydedilmesi.

3. **Node.js Backend'in Geliştirilmesi:**

    - Web3.js ile blockchain ağına bağlanılması.
    - Akıllı kontratlarla etkileşim için gerekli fonksiyonların yazılması.
    - Token transferi için bir API'nin oluşturulması ve Swagger ile dokümantasyonun yapılması.
    - Kazanan kullanıcıların listesini döndüren API'nin oluşturulması ve Swagger ile dokümantasyonun yapılması.

4. **Testler:**
    - Akıllı kontratların ve backend API'lerinin birim ve entegrasyon testlerinin yapılması.
    - API'lerin doğru çalışıp çalışmadığının kontrol edilmesi.

### **7. Sonuç**

Bu doküman, blockchain tabanlı bir Node.js backend uygulamasının geliştirilmesi için genel bir çerçeve sunmaktadır.

---
