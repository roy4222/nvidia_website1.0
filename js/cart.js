// 購物車類別
// 負責管理購物車的所有功能，包括添加商品、移除商品、更新數量、計算總價等
class ShoppingCart {
    // 構造函數
    // 初始化購物車，從本地存儲加載商品或創建空購物車
    constructor() {
        // 從本地存儲中獲取購物車項目，如果沒有則初始化為空數組
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        // 調用初始化方法
        this.init();
    }

    // 初始化方法
    // 更新購物車顯示，綁定事件監聽器
    init() {
        // 更新購物車顯示
        this.updateCartDisplay();
        // 更新購物車徽章數量
        this.updateBadgeCount();
        // 綁定事件監聽器
        this.bindEvents();
        // 綁定運送方式事件
        this.bindShippingEvents();
    }

    // 綁定事件
    // 為所有 "加入購物車" 按鈕添加點擊事件監聽器
    bindEvents() {
        // 選擇所有具有 'add-to-cart-btn' 類的按鈕
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            // 為每個按鈕添加點擊事件監聽器
            button.addEventListener('click', (e) => {
                // 從按鈕的 data 屬性中獲取商品信息
                const productId = e.target.dataset.productId;
                const productName = e.target.dataset.productName;
                const productPrice = parseFloat(e.target.dataset.productPrice);
                const productImage = e.target.dataset.productImage;
                
                // 調用 addItem 方法添加商品到購物車
                this.addItem({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            });
        });
    }

    // 綁定運送方式選擇事件
    bindShippingEvents() {
        const shippingSelect = document.getElementById('shippingMethod');
        if (shippingSelect) {
            shippingSelect.addEventListener('change', () => {
                this.updateCartPage();
            });
        }
    }

    // 添加商品到購物車
    // @param {Object} product - 要添加的商品對象
    addItem(product) {
        // 檢查購物車中是否已存在該商品
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            // 如果商品已存在，增加數量
            existingItem.quantity++;
        } else {
            // 如果商品不存在，將新商品添加到購物車
            this.items.push(product);
        }
        
        // 保存購物車到本地存儲
        this.saveCart();
        // 更新購物車顯示
        this.updateCartDisplay();
        // 顯示添加成功的提示
        this.showToast(`已將 ${product.name} 加入購物車`);
    }

    // 從購物車中移除商品
    // @param {string} productId - 要移除的商品ID
    removeItem(productId) {
        // 查找要移除的商品在數組中的索引
        const index = this.items.findIndex(item => item.id === productId);
        if (index > -1) {
            // 如果找到商品，記錄被移除的商品
            const removedItem = this.items[index];
            // 從數組中移除該商品
            this.items.splice(index, 1);
            // 保存更新後的購物車
            this.saveCart();
            // 更新購物車顯示
            this.updateCartDisplay();
            // 顯示移除成功的提示
            this.showToast(`已將 ${removedItem.name} 從購物車移除`);
        }
    }

    // 更新購物車中商品的數量
    // @param {string} productId - 要更新的商品ID
    // @param {number} newQuantity - 新的數量
    updateItemQuantity(productId, newQuantity) {
        // 查找要更新的商品
        const item = this.items.find(item => item.id === productId);
        if (item) {
            // 更新數量，確保數量在1到10之間
            item.quantity = Math.max(1, Math.min(10, newQuantity));
            // 保存更新後的購物車
            this.saveCart();
            // 更新購物車顯示
            this.updateCartDisplay();
        }
    }

    // 清空購物車
    clearCart() {
        // 將購物車項目設置為空數組
        this.items = [];
        // 保存更新後的購物車
        this.saveCart();
        // 更新購物車顯示
        this.updateCartDisplay();
        // 顯示清空成功的提示
        this.showToast('購物車已清空');
    }

    // 計算購物車總價
    // @returns {number} 總價
    calculateTotal() {
        // 使用 reduce 方法計算總價
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // 將購物車數據保存到本地存儲
    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    // 更新購物車徽章數量
    updateBadgeCount() {
        // 選擇所有購物車徽章元素
        const badges = document.querySelectorAll('.cart-badge');
        // 計算購物車中的總商品數量
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        // 更新每個徽章的文本
        badges.forEach(badge => {
            badge.textContent = totalItems;
        });
    }

    // 更新購物車顯示
    // 包括徽章數量、迷你購物車和購物車頁面
    updateCartDisplay() {
        this.updateBadgeCount();
        this.updateMiniCart();
        this.updateCartPage();
    }

    // 更新迷你購物車
    // 顯示在導航欄中的簡化購物車視圖
    updateMiniCart() {
        // 選擇迷你購物車的容器元素
        const miniCartItems = document.querySelector('.cart-items');
        if (!miniCartItems) return;

        // 如果購物車為空，顯示空購物車消息
        if (this.items.length === 0) {
            miniCartItems.innerHTML = `
                <div class="text-center py-4 text-muted empty-cart-message">
                    <i class="bi bi-cart-x display-6 mb-3"></i>
                    <p class="mb-0">購物車是空的</p>
                    <small>快去選購喜歡的商品吧！</small>
                </div>
            `;
        } else {
            // 如果購物車不為空，顯示所有商品
            miniCartItems.innerHTML = this.items.map(item => `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                        <div class="flex-grow-1">
                            <h6 class="mb-0">${item.name}</h6>
                            <div class="d-flex align-items-center mt-2">
                                <small class="text-muted me-2">數量：${item.quantity}</small>
                                <span class="text-nvidia">NT$ ${(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        </div>
                        <button class="btn btn-sm text-danger" onclick="cart.removeItem('${item.id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // 更新小計
        const subtotal = document.querySelector('.cart-subtotal');
        if (subtotal) {
            subtotal.textContent = `NT$ ${this.calculateTotal().toLocaleString()}`;
        }
    }

    // 更新購物車頁面和結帳頁面
    updateCartPage() {
        const subtotalAmount = this.calculateTotal();
        const shipping = this.calculateShippingFee(subtotalAmount);

        // 更新購物車頁面
        const cartItems = document.querySelector('.cart-items');
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        const checkoutBtn = document.querySelector('.checkout-btn');
        
        // 更新購物車商品列表
        if (cartItems && emptyCartMessage && checkoutBtn) {
            if (this.items.length === 0) {
                emptyCartMessage.style.display = 'block';
                cartItems.innerHTML = '';
                checkoutBtn.disabled = true;
            } else {
                emptyCartMessage.style.display = 'none';
                cartItems.innerHTML = this.items.map(item => `
                    <div class="cart-item" data-product-id="${item.id}">
                        <div class="d-flex align-items-center">
                            <!-- 商品圖片 -->
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                            <div class="flex-grow-1">
                                <!-- 商品名稱 -->
                                <h5 class="mb-1">${item.name}</h5>
                                <!-- 商品單價 -->
                                <div class="text-nvidia mb-2">NT$ ${item.price.toLocaleString()}</div>
                                <div class="d-flex align-items-center">
                                    <!-- 數量控制 -->
                                    <div class="quantity-control input-group me-3" style="width: 150px;">
                                        <!-- 減少數量按鈕 -->
                                        <button class="btn btn-outline-secondary" onclick="cart.updateItemQuantity('${item.id}', ${item.quantity - 1})">
                                            <i class="bi bi-dash"></i>
                                        </button>
                                        <!-- 數量輸入框 -->
                                        <input type="number" class="form-control text-center" value="${item.quantity}" min="1" max="10" 
                                               onchange="cart.updateItemQuantity('${item.id}', parseInt(this.value))">
                                        <!-- 增加數量按鈕 -->
                                        <button class="btn btn-outline-secondary" onclick="cart.updateItemQuantity('${item.id}', ${item.quantity + 1})">
                                            <i class="bi bi-plus"></i>
                                        </button>
                                    </div>
                                    <!-- 移除商品按鈕 -->
                                    <button class="btn btn-outline-danger" onclick="cart.removeItem('${item.id}')">
                                        <i class="bi bi-trash me-2"></i>移除
                                    </button>
                                </div>
                            </div>
                            <!-- 商品小計 -->
                            <div class="text-end ms-3">
                                <h5 class="text-nvidia mb-0">NT$ ${(item.price * item.quantity).toLocaleString()}</h5>
                            </div>
                        </div>
                    </div>
                `).join('');
                checkoutBtn.disabled = false;
            }
        }

        // 更新金額顯示（同時更新購物車頁面和結帳頁面的金額）
        const subtotalElements = document.querySelectorAll('.cart-subtotal');
        const shippingElements = document.querySelectorAll('.shipping-fee');
        const totalElements = document.querySelectorAll('.cart-total');
        
        subtotalElements.forEach(element => {
            if (element) element.textContent = `NT$ ${subtotalAmount.toLocaleString()}`;
        });
        
        shippingElements.forEach(element => {
            if (element) {
                if (subtotalAmount >= 30000) {
                    element.textContent = '免運費';
                    element.classList.add('text-success');
                } else {
                    element.textContent = `NT$ ${shipping.toLocaleString()}`;
                    element.classList.remove('text-success');
                }
            }
        });
        
        totalElements.forEach(element => {
            if (element) element.textContent = `NT$ ${(subtotalAmount + shipping).toLocaleString()}`;
        });

        // 更新結帳按鈕狀態
        const checkoutButton = document.querySelector('.btn-nvidia[type="submit"]');
        if (checkoutButton) {
            checkoutButton.disabled = subtotalAmount === 0;
        }
    }

    // 計算運費
    calculateShippingFee(subtotal) {
        // 如果訂單金額超過3000，免運費
        if (subtotal >= 30000) return 0;

        // 獲取選擇的運送方式
        const shippingSelect = document.getElementById('shippingMethod');
        if (!shippingSelect) return 100; // 默認運費

        // 從選項的 data-fee 屬性獲取運費
        const selectedOption = shippingSelect.options[shippingSelect.selectedIndex];
        return parseInt(selectedOption.dataset.fee) || 100;
    }

    // 顯示通知消息
    // @param {string} message - 要顯示的消息
    showToast(message) {
        // 獲取或創建 toast 容器
        const toastContainer = document.getElementById('toastContainer') || (() => {
            const container = document.createElement('div');
            container.id = 'toastContainer';
            container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1050;';
            document.body.appendChild(container);
            return container;
        })();

        // 創建新的 toast 元素
        const toastElement = document.createElement('div');
        toastElement.className = 'toast show';
        toastElement.innerHTML = `
            <div class="toast-header">
                <i class="bi bi-cart-check text-nvidia me-2"></i>
                <strong class="me-auto">購物車通知</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        `;

        // 將 toast 添加到容器中
        toastContainer.appendChild(toastElement);

        // 設置定時器，1.5秒後移除 toast
        setTimeout(() => {
            toastElement.remove();
        }, 1500);
    }
}

// 初始化購物車
const cart = new ShoppingCart();
