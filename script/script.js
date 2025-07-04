      let updateIndex = -1;

      function addToCart() {
        const itemName = document.getElementById("itemName").value;
        const itemCategory = document.getElementById("itemCategory").value;
        const itemPrice = document.getElementById("itemPrice").value;
        const itemQuantity = document.getElementById("itemQuantity").value;


        if (!itemName && !itemCategory && !itemPrice && !itemQuantity) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops!',
              text: 'Please fill the inputs before submit!',
              customClass: {
                popup: 'swal-font'
              }
            });
          return false;
        }

        const cartList = JSON.parse(localStorage.getItem("cart")) || [];

        if (updateIndex === -1) {
          cartList.push({ itemName, itemCategory ,itemPrice, itemQuantity });
          Swal.fire({
            title: "Data Saved!",
            imageUrl: "https://i.chzbgr.com/full/7016995584/h67AD50C2/i-am-a-shopping-cart-you-are-required-to-put-food-in-me/400/350",
            imageWidth: 400,
            imageHeight: 350,
            imageAlt: "Custom image",
            customClass: {
              popup: 'swal-font'
            }
          });
        } else {
          cartList[updateIndex] = { itemName, itemCategory ,itemPrice, itemQuantity };
          updateIndex = -1;
          document.getElementById("addItemBtn").innerText = "Update Item";
          Swal.fire({
            title: "Data Updated!",
            imageUrl: "https://img-9gag-fun.9cache.com/photo/aXoNRgb_460s.jpg",
            imageWidth: 460,
            imageHeight: 345,
            imageAlt: "Custom image",
            customClass: {
              popup: 'swal-font'
            }
          });
        }

        localStorage.setItem("cart", JSON.stringify(cartList));
        document.getElementById("cartForm").reset();
        displayData();

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }


      function displayData() {
        const tableBody = document.getElementById("table");
        const totalPriceElement = document.getElementById("totalPrice");
        const tableToCard = document.getElementById("display-mobile-data");

        tableBody.innerHTML = ``;
        tableToCard.innerHTML = ``;
        let total = 0;

        const cartList = JSON.parse(localStorage.getItem("cart")) || [];
        cartList.forEach((item, index) => {
          tableBody.innerHTML += `
                <tr class="">
                    <td class="p-3 text-sm text-center">${index + 1}</td>
                    <td class="p-3 text-sm text-center">${item.itemName}</td>
                    <td class="p-3 text-sm text-center">${item.itemCategory}</td>
                    <td class="p-3 text-sm text-center">Rp${parseInt(item.itemPrice).toLocaleString("id-ID")}</td> 
                    <td class="p-3 text-sm text-center">x${item.itemQuantity}</td>
                    <td class="p-3 text-sm text-center">
                        <button type="button"
                            style="font-family: var(--sub-main);"
                            class="purchaseItem p-1.5 text-base font-medium  bg-[#84B699] hover:bg-[#0A6D32] text-[#0A6D32] hover:text-white rounded"
                            onclick="purchaseitem(${index})">
                            Checkout 
                        </button>
                        <button type="button"
                            style="font-family: var(--sub-main);"
                            class="p-1.5 text-base font-medium  bg-[#F8DE88] hover:bg-[#CE6012] text-[#CE6012] hover:text-white rounded"
                            onclick="updateitem(${index})">
                            Edit
                        </button>
                        <button type="button"
                            style="font-family: var(--sub-main);"
                            class="p-1.5 text-base font-medium  bg-[#DF9394] hover:bg-[#A50609] text-[#A50609] hover:text-white rounded"
                            onclick="removeitem(${index})">
                            Delete
                        </button>
                    </td>   
                </tr>
                `;
          tableToCard.innerHTML += `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-5 md:hidden">
              <div class="bg-white space-y-3 p-6 gap-3 rounded-lg shadow" style="border-color: #0091d4;">
                <div
                  class="w-10 h-10 bg-[#d2effc] text-[#0091d4] font-extrabold flex items-center justify-center rounded-full mb-3"
                >
                  ${index + 1}
                </div>
                <div
                  style="font-family: var(--main-font2)"
                  class="font-bold text-zinc-950 mb-1"
                >
                  ${item.itemName}
                </div>
                <div
                  style="font-family: var(--main-font2)"
                  class="font-bold text-zinc-950 mb-1"
                >
                  Rp${parseInt(item.itemPrice).toLocaleString("id-ID")}
                </div>
                <div
                  style="font-family: var(--main-font2)"
                  class="font-bold text-zinc-950 mb-3"
                >
                  x${item.itemQuantity}
                </div>
                <div class="flex justify-between space-x-2 text-sm">
                  <div
                    style="font-family: var(--sub-main);"
                    class="font-extralight mb-1 text-[#FDB814] border border-[#FDB814] px-2 py-1 rounded w-fit"
                  >
                    ${item.itemCategory}
                  </div>
                  </div>
                  <div class="button-action justify-end flex space-x-2">
                    <button
                      type="button"
                      style="font-family: var(--sub-main)"
                      class="purchaseItem p-1.5 text-base font-medium bg-[#84B699] hover:bg-[#0A6D32] text-[#0A6D32] hover:text-white rounded"
                      onclick="purchaseitem(${index})"
                    >
                      Checkout 
                    </button>
                    <button
                      type="button"
                      style="font-family: var(--sub-main)"
                      class="p-1.5 text-base font-medium bg-[#F8DE88] hover:bg-[#CE6012] text-[#CE6012] hover:text-white rounded"
                      onclick="updateitem(${index})"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      style="font-family: var(--sub-main)"
                      class="p-1.5 text-base font-medium bg-[#DF9394] hover:bg-[#A50609] text-[#A50609] hover:text-white rounded"
                      onclick="removeitem(${index})"
                    >
                      Delete
                    </button>
                </div>
              </div>
            </div>            
          `;
          total += parseInt(item.itemPrice) * parseInt(item.itemQuantity);
        });

        totalPriceElement.innerText = total.toLocaleString("id-ID");
      }

      function removeitem(index) {
        const cartList = JSON.parse(localStorage.getItem("cart")) || [];

        if (index < 0 || index >= cartList.length) {
          console.warn("Attempted to remove item with invalid index:", index);
          return;
        }

        const itemToRemove = cartList[index];

        Swal.fire({
          title: `Delete "${itemToRemove.itemName}"?`,
          text: "This action cannot be undone.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
          customClass: {
            popup: "swal-font", 
          },
        }).then((result) => {
          if (result.isConfirmed) {
            cartList.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartList));
            displayData();

            Swal.fire({
              title: "Deleted!",
              text: `"${itemToRemove.itemName}" has been removed.`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "swal-font", 
              },
            });
          }
        });
      }


      function updateitem(index) {
        const cartList = JSON.parse(localStorage.getItem("cart")) || [];

        const item = cartList[index];
        document.getElementById("itemName").value = item.itemName;
        document.getElementById("itemCategory").value = item.itemCategory;
        document.getElementById("itemPrice").value = item.itemPrice;
        document.getElementById("itemQuantity").value = item.itemQuantity;

        updateIndex = index;
        document.getElementById("addItemBtn").innerText = "Update Item";
      }

      function removeAllProduct() {
      const btnRemoveAllProduct = document.getElementById("removeAllProduct");

        btnRemoveAllProduct.addEventListener("click", () => {
          Swal.fire({
            title: "Delete all products?",
            text: "This will clear your entire cart!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete all",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            customClass: {
              popup: "swal-font", 
            },
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("cart");
              displayData();
              displayDataPurchased();

              Swal.fire({
                icon: "success",
                title: "Cart Cleared!",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              displayData(); 
            }
          });
        });
      }

      function purchaseitem(index) {
        const cartList = JSON.parse(localStorage.getItem("cart")) || [];
        const purchasedList =
          JSON.parse(localStorage.getItem("purchased")) || [];

        const selectedItem = cartList[index];

        purchasedList.push(selectedItem);

        cartList.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cartList));
        localStorage.setItem("purchased", JSON.stringify(purchasedList));

        displayData();
        displayDataPurchased();

        const audioBuy = new Audio("/audio/Arigatou - Anime Sound Effect (HD).mp3");
        audioBuy.play();
      }


      function displayDataPurchased() {
        const purchasedList =
          JSON.parse(localStorage.getItem("purchased")) || [];
        const purchasedBody = document.getElementById("tablePurchased");
        const tableToCardPurchased = document.getElementById("display-mobile-data-purchased")

        purchasedBody.innerHTML = "";
        tableToCardPurchased.innerHTML = "";

        purchasedList.forEach((item, index) => {
          purchasedBody.innerHTML += `       
                  <tr class="">
                    <td class="p-3 text-sm text-center">${index + 1}</td>
                    <td class="p-3 text-sm text-center">${item.itemName}</td>
                    <td class="p-3 text-sm text-center">${item.itemCategory}</td>
                    <td class="p-3 text-sm text-center">Rp${parseInt(item.itemPrice).toLocaleString("id-ID")}</td> 
                    <td class="p-3 text-sm text-center">x${item.itemQuantity}</td>
                    <td class="p-3 text-sm text-center">
                        <button type="button"
                            style="font-family: var(--sub-main);"
                            class="purchaseItem p-1.5 text-base font-medium  bg-gray-300 text-[#013048] rounded-full cursor-not-allowed">
                            ✅ Purchased
                        </button>
                    </td>   
                    <td class="p-3 text-sm text-center">
                      <button type="button"
                            style="font-family: var(--sub-main);"
                            class="p-1.5 text-base font-medium  bg-[#DF9394] hover:bg-[#A50609] text-[#A50609] hover:text-white rounded"
                            onclick="removeitempurchased(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
                `;
          tableToCardPurchased.innerHTML += `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-5 md:hidden">
              <div class="bg-white p-6 gap-3 rounded-lg shadow" style="border-color: #009e48;">
                <div class="flex items-center justify-between space-x-2 text-sm">
                  <div
                    class="w-10 h-10 font-extrabold flex items-center justify-center rounded-full mb-3"
                    style="background-color: #daf5e5; color: #009e48;"
                  >
                    ${index + 1}
                  </div>
                  <div>
                    <button type="button"
                            style="font-family: var(--sub-main);"
                            class="p-1.5 text-base font-medium bg-gray-300 text-[#013048] rounded-full cursor-not-allowed">
                            ✅ Purchased
                        </button>
                  </div>
                </div>
                <div
                  style="font-family: var(--main-font2)"
                  class="font-bold text-zinc-950 mb-1"
                >
                  ${item.itemName}
                </div>
                <div
                  style="font-family: var(--main-font2)"
                  class="font-bold text-zinc-950 mb-3"
                >
                  Rp${parseInt(item.itemPrice).toLocaleString("id-ID")}
                </div>
                <div
                  style="font-family: var(--main-font2)"
                  class="font-bold text-zinc-950 mb-3"
                >
                  x${item.itemQuantity}
                </div>
                <div class="flex justify-between space-x-2 text-sm">
                  <div
                    style="font-family: var(--sub-main);"
                    class="font-extralight mb-1 text-[#FDB814] border border-[#FDB814] px-2 py-1 rounded w-fit"
                  >
                    ${item.itemCategory}
                  </div>
                  <div>
                    <button
                      type="button"
                      style="font-family: var(--sub-main)"
                      class="p-1.5 text-base font-medium bg-[#DF9394] hover:bg-[#A50609] text-[#A50609] hover:text-white rounded"
                      onclick="removeitempurchased(${index})"
                    >
                      Delete
                  </button> 
                  </div
                </div>
              </div>
            </div>
          `
        });
      }

      function removeitempurchased(index) {
        const cartPurchasedList = JSON.parse(localStorage.getItem("purchased")) || [];

        if (index < 0 || index >= cartPurchasedList.length) {
          console.warn("Attempted to remove item with invalid index:", index);
          return;
        }

        const itemToRemove = cartPurchasedList[index];

        Swal.fire({
          title: `Delete "${itemToRemove.itemName}"?`,
          text: "This action cannot be undone.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
          customClass: {
            popup: "swal-font",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            cartPurchasedList.splice(index, 1);
            localStorage.setItem("purchased", JSON.stringify(cartPurchasedList));
            displayDataPurchased();

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: `"${itemToRemove.itemName}" has been removed.`,
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "swal-font",
              },
            });
          }
        });
      }

      function removeAllProductPurchased() {
      const btnRemoveAllProductPurchased = document.getElementById("removeAllProductPurchased");

        btnRemoveAllProductPurchased.addEventListener("click", () => {
          Swal.fire({
            title: "Delete all products?",
            text: "This will clear your entire purchased cart!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete all",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            customClass: {
              popup: "swal-font", 
            },
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("purchased");
              displayData();
              displayDataPurchased();

              Swal.fire({
                icon: "success",
                title: "Cart Purchased Cleared!",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: "swal-font", 
                },
              });
            } else {
              displayData(); 
            }
          });
        });
      }

      var nyan = document.getElementById('nyan');
      var nyanBtn = document.getElementById('nyan-btn');

      function playPause(song){
        if (song.paused && song.currentTime >= 0 && !song.ended) {
            song.play();
        } else {
            song.pause();
        }
      }

      function reset(btn, song){
        if(btn.classList.contains('playing')){
            btn.classList.toggle('playing');
        }
        song.pause();
        song.currentTime = 0;
      }

      function progress(btn, song){
        setTimeout(function(){
            var end = song.duration; 
            var current = song.currentTime;
            var percent = current/(end/100);
            //check if song is at the end
            if(current==end){
              reset(btn, song);
            }
            //set inset box shadow
            btn.style.boxShadow = "inset " + btn.offsetWidth * (percent/100) + "px 0px 0px 0px rgba(0,0,0,0.125)"
            //call function again
            progress(btn, song);     
        }, 1000);
      }

      nyanBtn.addEventListener('click', function(){
        nyanBtn.classList.toggle('playing');
        playPause(nyan);
        progress(nyanBtn, nyan);
      });



      window.onload = function () {
        displayData();
        displayDataPurchased();
      };
