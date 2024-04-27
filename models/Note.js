const mongoose = require("mongoose");
const { Schema } = mongoose;


// Schema for Users -
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  data: {
    Info: {
      invoice: {
        type: String,
      },
      company: {
        type: String,
      },
      name: {
        type: String,
      },
      img: {
        type: String,
      },
      imgDataName: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pincode: {
        type: String,
      },
      country: {
        type: String,
      },
      billTo: {
        type: String,
      },
      billFrom: {
        type: String,
      },
      tocompany: {
        type: String,
      },
      toname: {
        type: String,
      },
      toaddress: {
        type: String,
      },
      tocity: {
        type: String,
      },
      tostate: {
        type: String,
      },
      topincode: {
        type: String,
      },
      tocountry: {
        type: String,
      },
      invoiceNo: {
        type: String,
      },
      invoiceNoVal: {
        type: String,
      },
      gstNo: {
        type: String,
      },
      togstNo: {
        type: String,
      },
      invoiceDate: {
        type: String,
      },
      invoiceDateVal: {
        type: String,
      },
      invoiceDDate: {
        type: String,
      },
      invoiceDDateVal: {
        type: String,
      },
      item: {
        type: String,
      },
      quantity: {
        type: String,
      },
      rate: {
        type: String,
      },
      cgst: {
        type: String,
      },
      sgst: {
        type: String,
      },
      amount: {
        type: String,
      },
      terms: {
        type: String,
      },
      conditions: {
        type: String,
      },
      note: {
        type: String,
      },
      noteDescription: {
        type: String,
      }
    },
    items: [
      {
        index: {
          type: String,
        },
        itemName: {
          type: String,
        },
        itemQuantity: {
          type: String,
        },
        itemRate: {
          type: String,
        },
        itemAmount: {
          type: Number,
        },
      },
    ],
    subTotalData: {
      discount: {
        type: String,
      },
      discountVal: {
        type: String,
      },
      serviceCharge: {
        type: String,
      },
      serviceChargeVal: {
        type: String,
      },
      otherTax: {
        type: String,
      },
      otherTaxVal: {
        type: String,
      },
      subTotal: {
        type: String,
      },
      subTotalVal: {
        type: String,
      },
      gst: {
        type: String,
      },
      gstVal: {
        type: String,
      },
      amountPaid: {
        type: String,
      },
      amountPaidValue: {
        type: String,
      },
      balanceDue: {
        type: String,
      },
      balanceDueValue: {
        type: String,
      },
      otherTaxType: {
        type: Boolean,
      },
      discountType: {
        type: Boolean,
      },
      serviceTaxType: {
        type: Boolean,
      }
    }
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// const User = mongoose.model('notes', NotesSchema);
// module.exports = User;
module.exports = mongoose.model("Invoice", NotesSchema);