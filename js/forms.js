
function formAddOption(dst, txt, val) {
    var opt = document.createElement('option');

    opt.text = txt;
    opt.value = val;

    dst.options.add(opt);
}

function formPopulateSelect(dst, lst) {
    dst.options.length = 0;

    for (idx = 0; idx < lst.length; idx++) {
        if (idx == 0 && lst.length > 1) {
            formAddOption(dst, lst[idx], '');
        } else {
            formAddOption(dst, lst[idx], lst[idx]);
        }
    }
}

function formPopulatePrices(cur, prc) {
    for (idx = 0; idx < cur.length; idx++) {
        cur[idx].innerHTML = '';
    }

    if (cur.length != prc.length)
        return;

    for (idx = 0; idx < cur.length; idx++) {
        cur[idx].innerHTML = prc[idx]; 
    }

}

function formCurrency(amount)
{
    return '$C' + amount.toFixed(2);
}

function formInvoice(price, tax, rebate, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, taxIncluded)
{
    if (taxIncluded)
    {
        var total = price;
        price = total / ( 1 + tax / 100);
    }

    centsTax = Math.round(price * tax / 100);
    centsRebate = Math.round(price * rebate / 100);
    invoiceItem.innerHTML = formCurrency(price / 100);
    invoiceTax.innerHTML = formCurrency(centsTax / 100);
    invoiceRebate.innerHTML = '-' + formCurrency(centsRebate / 100);
    invoiceTotal.innerHTML = formCurrency((price + centsTax - centsRebate) / 100);
}

function formStateChange(src, dst, vat, ind, cur) {
    var caStates = new Array('Select a Province or Territory *', 'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon');
    var notApplicableStates = new Array('N/A');
    var usStates = new Array('Select a State *', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming');

    var caPrices = new Array('C$6.99/month', 'C$24.99/month', 'C$59.99/month', 'C$179.99/month');
    var euPrices = new Array('(Not available in the EU)', 'C$29.99/month', 'C$69.99/month', 'C$199.99/month');
    var jpPrices = new Array('(Not available in Japan)', 'C$29.99/month', 'C$69.99/month', 'C$199.99/month');
    var usPrices = new Array('C$6.99/month', 'C$24.99/month', 'C$59.99/month', 'C$179.99/month');

    if (src == null)
        return;

    switch (src.value) {
        case 'Canada':
            ind.disabled = false;
            vat.hidden = true;
            formPopulatePrices(cur, caPrices);
            formPopulateSelect(dst, caStates);
            dst.parentNode.hidden = false;
            break;
        case 'United States':
            ind.disabled = false;
            vat.hidden = true;
            formPopulatePrices(cur, usPrices);
            formPopulateSelect(dst, usStates);
            dst.parentNode.hidden = false;
            break;
        case 'Japan':
            ind.checked = false;
            ind.disabled = true;
            vat.hidden = true;
            dst.parentNode.hidden = true;
            formPopulatePrices(cur, jpPrices);
            formPopulateSelect(dst, notApplicableStates);
            break;
        default:
            // EU countries:
            ind.checked = false;
            ind.disabled = true;
            vat.hidden = false;
            dst.parentNode.hidden = true;
            formPopulatePrices(cur, euPrices);
            formPopulateSelect(dst, notApplicableStates);
            break;
    }
}

function formProductSelect(country, state, terms, price, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal) {
    terms.checked = false;

    price = price.innerHTML.match(/\d+\.\d{2}/);

    if (price == null || price.length == 0) {
        formClearInvoice();

        return;
    }

    var centsItem = parseFloat(price[0])*100;
    var centsTax = 0;

    switch (country.value) {
        case 'Austria':
            formInvoice(centsItem, 20, 20, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, true);
            break;
        case 'Belgium':
            formInvoice(centsItem, 21, 21, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, true);
            break;
        case 'France':
            formInvoice(centsItem, 20, 20, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, true);
            break;
        case 'Germany':
            formInvoice(centsItem, 19, 19, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, true);
            break;
        case 'Italy':
            formInvoice(centsItem, 22, 22, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, true);
            break;
        case 'Ireland':
            formInvoice(centsItem, 23, 23, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, true);
            break;
        case 'Netherlands':
            formInvoice(centsItem, 21, 21, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, true);
            break;
        case 'Portugal':
            formInvoice(centsItem, 23, 23, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, true);
            break;
        case 'Spain':
            formInvoice(centsItem, 21, 21, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, true);
            break;
        case 'United Kingdom':
            formInvoice(centsItem, 20, 20, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, true);
            break;
        case 'Canada':
            switch (state.value) {
                case 'Alberta':
                    formInvoice(centsItem, 5, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'British Columbia':
                    formInvoice(centsItem, 12, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'Manitoba':
                    formInvoice(centsItem, 13, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'New Brunswick':
                    formInvoice(centsItem, 13, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'Newfoundland':
                    formInvoice(centsItem, 13, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'Northwest Territories':
                    formInvoice(centsItem, 5, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'Nova Scotia':
                    formInvoice(centsItem, 15, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'Nunavut':
                    formInvoice(centsItem, 5, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'Ontario':
                    formInvoice(centsItem, 13, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'Prince Edward Island':
                    formInvoice(centsItem, 14, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'Quebec':
                    formInvoice(centsItem, 14.975, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'Saskatchewan':
                    formInvoice(centsItem, 10, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                case 'Yukon':
                    formInvoice(centsItem, 5, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                default:
                    formClearInvoice();
                    break;
            }
            break;
        case 'United States':
            switch (state.value) {
                case 'New Jersey':
                    formInvoice(centsItem, 7, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
                default:
                    formInvoice(centsItem, 0, 0, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, false);
                    break;
            }
            break;
        case 'Japan':
            formInvoice(centsItem, 8, 8, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal, true);
            break;
        default:
            break;
    }
}

function formClearInvoice()
{
    var invoiceItem = $('#invoice_item').get(0);
    var invoiceTax = $('#invoice_tax').get(0);
    var invoiceRebate = $('#invoice_rebate').get(0);
    var invoiceTotal = $('#invoice_total').get(0);

    invoiceItem.innerHTML = '-';
    invoiceTax.innerHTML = '-';
    invoiceRebate.innerHTML = '-';
    invoiceTotal.innerHTML = '-';
}

function formRecalculateTotal()
{
    var itemSelected = $("input[type='radio'][name='license']:checked");

    if (itemSelected == null || itemSelected.length == 0)
    {
        formClearInvoice();
        return;
    }

    var priceId = itemSelected.val();

    var country = $('#country').get(0);
    var state = $('#state').get(0);
    var eula = $('#eula').get(0);
    var price = $('#' + priceId).get(0);
    var invoiceItem = $('#invoice_item').get(0);
    var invoiceTax = $('#invoice_tax').get(0);
    var invoiceRebate = $('#invoice_rebate').get(0);
    var invoiceTotal = $('#invoice_total').get(0);

    formProductSelect(country, state, eula, price, invoiceItem, invoiceTax, invoiceRebate, invoiceTotal);
}

$(function() {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://getsimpleform.com/messages/ajax?form_api_token=59606401edc31349a4f6026dded5f1cc",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                dataType: 'jsonp',
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent!</strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that the darn server is not responding. Please, send an email to <a href=\"mailto:kim@codamono.com\">kim@codamono.com</a> instead!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/* When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});


