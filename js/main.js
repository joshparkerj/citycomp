//Base URL
var base = "http://localhost:8081/"
var imagebase = "http://city-plot.joshquizzes.com/"

// if(localStorage.getItem("id") != null){
//     window.location.href = "http://localhost:3000/";
// }

$(document).ready(function () {
    $(document).ready(function () {

        $('#submitFinancials').on('click', e => {
            console.log("Getting Financials");
            submitFinancialsItemized();
        });

        $('#addBuilding').on('click', e => {
            console.log("Sending Building");
            submitBuilding();
        });

        $('#prediction').on('click', e => {
            console.log("Getting Preditictions");
            submitPredictions();
        });

        $('#email').on('click', e => {
            console.log("Sending Email");
            submitEmail();
        });

    });
});

function submitFinancialsItemized() {
    var department = $('#financialsDepartment').val();
    var startDate = $('#financialsStartDate').val();
    var endDate = $('#financialsEndDate').val();
    var info = $('#financialsInfo').val();
    //var itemize = false;
    // if(info == "Revenue-Itemized"){
    //     itemize = true;
    //     info = "Revenue";
    // }else if (info == "Revenue-Collated"){ 
    //     info = "Revenue";
    // }else if (info == "Expense-Itemized"){ 
    //     itemize = true;
    //     info = "Expense";
    // }else{ 
    //     info = "Expense";
    // }
    var depOption;

    switch (department) {
        case "Fire Department":
            // code block
            depOption = "Fire";
            console.log("Fire");
            getDataForFinancials(depOption, startDate, endDate, info);
            break;
        case "Police Department":
            // code block
            depOption = "Police";
            console.log("Police");
            getDataForFinancials(depOption, startDate, endDate, info);
            break;
        case "Department of Health Services":
            // code block
            depOption = "Hospital";
            console.log("Health");
            getDataForFinancials(depOption, startDate, endDate, info);
            break;
        case "Parks and Recreation":
            // code block
            depOption = "Parks";
            console.log("Parks");
            getDataForFinancials(depOption, startDate, endDate, info);
            break;
        case "Sewage & Waste Managment":
            // code block
            depOption = "Sewage";
            console.log("Sewage");
            getDataForFinancials(depOption, startDate, endDate, info);
            break;

        default:
            // code block
            //code 
            console.log("Running default");
            console.log("DEPARTMENT: " + department);
    }
}


//Sub method for finanial retrieval
function getDataForFinancials(department, startDate, endDate, info) {
    console.log("Department: " + department + " StartDate:" + startDate + " EndDate:" + endDate + " Info:" + info);

    startDate = startDate + "-01-01";
    endDate = endDate + "-12-31";
    updateGraph(department);
    $.ajax({
        method: 'GET',
        // contentType: 'application/json; charset=utf-8',
        url: base + "search/" + department + "/" + startDate + "/" + endDate + "/" + info + "/json",
        success: function loginSuccess(succ) {
            // console.log("Succ:" + succ);
            // console.log(succ);

            var contentToRemove = document.querySelectorAll("#DELETETHIS");
            $(contentToRemove).remove();
            contentToRemove = document.querySelectorAll("#newlyAppened");
            $(contentToRemove).remove()
            var sum = 0;
            var depName = "";
            if (succ.length > 0) {
                if (succ[0].organization == "Sewage") {
                    depName = "Sewage & Waste Management";
                } else if (succ[0].organization == "Parks") {
                    depName = "Parks and Recreation";
                } else if (succ[0].organization == "Hospital") {
                    depName = "Department of Health and Services";
                } else {
                    depName = succ[0].organization + " Department";
                }
            }
            succ.forEach(function (obj) {
                var date = obj.date;
                if (date == undefined) {
                    date = "";
                }
                sum = sum + obj.amount;
                $('#financialAppend').after(`<tr id="newlyAppened" style="background-color: #f7f7f7;"><td class="item-col item"><table cellspacing="0" cellpadding="0" width="100%"><tr><td class="product"><span style="color: #4d4d4d; font-weight:bold; padding-left: 15px;">${depName}</span></td></tr></table></td><td class="item-col">${obj.description}</td><td class="item-col">${date}</td><td class="item-col">$${formatMoney(obj.amount)}</td></tr>`);

            });


            var total = "$" + formatMoney(sum);
            //total = formatMoney
            // console.log($("#financialTotal").text());
            $("#financialTotal").text(total);

        },
        error: function loginError(err) {
            console.log("Error hit trying to hit finiancials in mule.")
        }
    });


}


function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}

//Updates page graph with josh's graph
function updateGraph(department) {
    var newImage = imagebase + department;

    console.log(newImage);
    $("#graph").attr('src', newImage);

}

//Submits new building
function submitBuilding() {
    var department = $("#planningDepartment").val();
    var sqfeet = $("#planningInput").val();
    console.log("Dep " + department);
    console.log("Sq feet " + sqfeet);


    switch (department) {
        case "Fire Department":
            // code block
            depOption = "Fire";
            console.log("Fire");
            callAddBuilding(depOption, sqfeet);
            break;
        case "Police Department":
            // code block
            depOption = "Police";
            console.log("Police");
            callAddBuilding(depOption, sqfeet);
            break;
        case "Department of Health Services":
            // code block
            depOption = "Hospital";
            console.log("Health");
            callAddBuilding(depOption, sqfeet);
            break;
        case "Parks and Recreation":
            // code block
            depOption = "Parks";
            console.log("Parks");
            callAddBuilding(depOption, sqfeet);
            break;
        case "Sewage & Waste Managment":
            // code block
            depOption = "Sewage";
            console.log("Sewage");
            callAddBuilding(depOption, sqfeet);
            break;

        default:
            // code block
            //code 
            console.log("Running default");
            console.log("DEPARTMENT: " + department);
    }
}

//Makes call to mule service
function callAddBuilding(department, sqfeet) {
    $.ajax({
        method: 'GET',
        // contentType: 'application/json; charset=utf-8',
        url: base + "building/" + department + "/" + sqfeet,
        success: function buildingSuccess(succ) {
            console.log("success")
            let p = `<p style="color:green; margin-top:0px;">Adding building was succesfull, enjoy your new place!</p>`
            $('#addBuildingMessage').empty().append(p);
        },
        error: function buildingError(err) {
            let p = `<p style="color:red; margin-top:0px;">Unable to add new building please try again later.</p>`
            $('#addBuildingMessage').empty().append(p);
        }
    });
}

//Makes call to email
function submitEmail() {
    var address = $('#emailAddress').val();
    var startDate = $('#emailStartYear').val();
    var endDate = $('#emailEndYear').val();

    startDate = startDate+"-01-01";
    endDate = endDate+"-12-31";
    $.ajax({
        method: 'GET',
        // contentType: 'application/json; charset=utf-8',
        url: base + "invoice?email=" + address + "&start=" + startDate + "&end=" + endDate,
        success: function emailSuccess(succ) {
            console.log("yay")
            
        },
        error: function emailError(err) {

        }
    });
}

function submitPredictions() {
    var department = $('#preditctionDepartment').val();
    var startDate = $('#predictionFirstYear').val();
    var endDate = $('#predictionSecondYear').val();
    var info = $('#predictionInfo').val();
    console.log(department);
    console.log(startDate);
    console.log(endDate);
    console.log(info);

    if (startDate > endDate || (endDate-startDate)!=1) {
        console.log("BAD USER DON'T DO THAT!");
    } else {
        var depOption;

        switch (department) {
            case "Fire Department":
                // code block
                depOption = "Fire";
                console.log("Fire");
                getPredictions(depOption, startDate, endDate, info);
                break;
            case "Police Department":
                // code block
                depOption = "Police";
                console.log("Police");
                getPredictions(depOption, startDate, endDate, info);
                break;
            case "Department of Health Services":
                // code block
                depOption = "Hospital";
                console.log("Health");
                getPredictions(depOption, startDate, endDate, info);
                break;
            case "Parks and Recreation":
                // code block
                depOption = "Parks";
                console.log("Parks");
                getPredictions(depOption, startDate, endDate, info);
                break;
            case "Sewage & Waste Managment":
                // code block
                depOption = "Sewage";
                console.log("Sewage");
                getPredictions(depOption, startDate, endDate, info);
                break;

            default:
                // code block
                //code 
                console.log("Running default");
                console.log("DEPARTMENT: " + department);
        }
    }
}


function getPredictions(department, startDate, endDate, info) {
    $.ajax({
        method: 'GET',
        // contentType: 'application/json; charset=utf-8',
        url: base + "projections/" + department + "/" + info.toLowerCase() + "/" + startDate + "/" + endDate,
        success: function loginSuccess(succ) {
            console.log("Succ:" + succ);
            console.log(succ);

            var contentToRemove = document.querySelectorAll("#PREDICTIONSDELETETHIS");
            $(contentToRemove).remove();
            var sum = 0;
            var depName = "";
            if (succ.length > 0) {
                if (succ.department == "Sewage") {
                    depName = "Sewage & Waste Management";
                } else if (department == "Parks") {
                    depName = "Parks and Recreation";
                } else if (department == "Hospital") {
                    depName = "Department of Health and Services";
                } else {
                    depName = department + " Department";
                }
            }
            console.log(depName);
            console.log(department);
            console.log("test");
            var lookup = info + ' Projection';
            console.log("lookup: " + lookup);


            var res = succ.split(':');
            res = res[2].split('}');
            $('#predictionaddition').after(`<tr id="PREDICTIONSDELETETHIS" style="background-color: #f7f7f7;"><td class="item-col item"><table cellspacing="0" cellpadding="0" width="100%"><tr><td class="product" style="padding-bottom: 20px"><span style="color: #4d4d4d; padding-left: 15px;">${depName}</span></td></tr></table></td><td class="item-col">${Number(endDate) + 1}</td><td class="item-col">${info}</td><td class="item-col">$${formatMoney(Number(res[0]))}</td></tr>`);

            var total = "$" + formatMoney(sum);
            //total = formatMoney
            // console.log($("#financialTotal").text());
            $("#financialTotal").text(total);

        },
        error: function loginError(err) {
            console.log("Error hit trying to hit finiancials in mule.")
        }
    });
}






