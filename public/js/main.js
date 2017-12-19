 var imgUrl = "/img/";


//Global function for Formetted input (Replica in App Locals)
function formatInputData(input){
    
    var intNum = parseInt(input);
    if(isNaN(intNum)){
        return "N/A";
    }
    if(Math.abs(intNum) >= 1000){
        return intNum;
    }else if(Math.abs(intNum) >=100 && Math.abs(intNum) < 10000){
        return parseFloat(input).toFixed(1);
    }else{
        return parseFloat(input).toFixed(2);
    }
}

//(Replica in App Locals)
function getUnit(Unit1,Unit2,curr){
   
    var U1 = Unit1 || "";
    var U2 = Unit2 || "";
    var Unit = U1 + " " + U2;
    Unit = Unit.replace(/unit/ig,'');

    Unit = Unit.replace(/currency/ig,curr);
    Unit = Unit.replace(/percentage/ig,"%");

    return Unit.trim();
}

//Update Data as per Financial Year (Replica in App Locals)
function calulateDataAccordingToYear(lineData, cmp , year,curr) {
    
    if(curr == undefined || curr == ''){
        curr = "INR";
    }
    if(year == undefined){
        year = $("#financialYearDD").val();
    }
    var data = {};
    try {
        data.MarketCap = parseFloat(lineData[24].cells[year] * cmp);
        data.EPS = lineData[100030].cells[year];
        if($('#fYear').length > 0){
            var $yr = $('#fYear');
            var y3 = lineData[100030].cells[$yr.find("option:eq(3)").html()];
            var y0 = lineData[100030].cells[$yr.find("option:eq(0)").html()];
            y3 = parseFloat(y3);
            y0 = parseFloat(y0);
            var res = (Math.pow((y3/y0),1/3) - 1)*100;  
        }else{
            var res;
        }
        data.YearsEPS = parseFloat(res) || '-';
        data.Evebitda = parseFloat(((data.MarketCap + parseFloat(lineData[105020].cells[year]) + parseFloat(lineData[105015].cells[year]) - parseFloat(lineData[105001].cells[year])) / parseFloat(lineData[100021].cells[year])).toFixed(2));
        data.PE = parseFloat((cmp / parseFloat(data.EPS)).toFixed(2));
        data.PB = parseFloat((cmp / parseFloat(lineData[100040].cells[year])));
        data.DY = parseFloat((parseFloat(lineData[100042].cells[year]))/cmp);
        data.ROE = lineData[100041].cells[year];
        /*data.Units = {
            MarketCap : getUnit(lineData[24].Unit1,lineData[24].Unit2,curr),
            EPS : getUnit(lineData[100030].Unit1,lineData[100030].Unit2,curr),
            Evebitda : getUnit(lineData[105020].Unit1,lineData[105020].Unit2,curr),
            ROE : getUnit(lineData[100041].Unit1,lineData[100041].Unit2,curr),
            PB : getUnit(lineData[100040].Unit1,lineData[100040].Unit2,curr),
            PE : getUnit(lineData[100030].Unit1,lineData[100030].Unit2,curr),
            DY : getUnit(lineData[100042].Unit1,lineData[100042].Unit2,curr),
        };*/
    } catch (e) {
        console.log("Error in Valuation Table calculation :", e);
    }
    return data;
}

function updateTableData(year){
    var tbRow = $(".company_row");
    tbRow.each(function(el){
        var cmp =  parseFloat($(this).find(".cmp").data('cmp'));
        var lineData = JSON.parse($(this).find(".lineData").html());
        var currency = $(this).attr('data-currency');
        if(lineData == null || lineData == undefined){
           return ;
        }

        
        /*if(el == 0){

            //update market cap in header
            var cmpUnit  = tbRow.closest("table").find("#cmpUnit").html();
           tbRow.closest("table").find("#mrktCapUnit").html(cmpUnit + " " +getUnit(lineData[24].Unit1,lineData[24].Unit2,currency));
        }*/
        var data = calulateDataAccordingToYear(lineData,cmp,year,currency);
        $(this).find(".MarketCap").html(formatInputData(data.MarketCap));
        $(this).find(".EPS").html(formatInputData(data.EPS));
        $(this).find(".Evebitda").html(formatInputData(data.Evebitda));
        $(this).find(".PE").html(formatInputData(data.PE));
        $(this).find(".ROE").html(formatInputData(parseFloat(data.ROE)*100));
        $(this).find(".PB").html(formatInputData(parseFloat(data.PB)));
        $(this).find(".DY").html(formatInputData(parseFloat(data.DY)*100));
        $(this).find(".YearsEPS").html(formatInputData(parseFloat(data.YearsEPS)));
    })
};

 (function($) {

    'use strict';

    // modal calculation




    $(document).ready(function() {

        // Validation method for budget, profit, revenue fields
        $.validator.addMethod("usd", function(value, element) {
            return this.optional(element) || /^(\$?)(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/.test(value);
        }, "Please specify a valid dollar amount");

        //Validation Method for Password
        $.validator.addMethod("password", function(value, element) {
            return this.optional(element) || /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}$/.test(value);
        }, "Please enter password having Alpha Numeric and more than 4 characters and maximum 20 characters");

        //Validation Method for Phone
        $.validator.addMethod("phone", function(value, element) {
            return this.optional(element) || /^[789]\d{9}$/.test(value);
        }, "Please enter phone number of 10 digits");

        //Validation Method for name
        $.validator.addMethod("fname", function(value, element) {
            return this.optional(element) || /^[a-zA-Z][a-zA-Z\s]*$/.test(value);
        }, "Please enter a name");

        //Change Message for errors
        $.extend(jQuery.validator.messages, {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
            minlength: jQuery.validator.format("Please enter at least {0} characters."),
            rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
            range: jQuery.validator.format("Please enter a value between {0} and {1}."),
            max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
            min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
        });
        $('#start-date, #end-date').datepicker();

        $('#form-personal').validate();

        $("#admin-add-cmpny-form").validate();

        if ($(".myValidation").length > 0) {
            $(".myValidation").validate();
        }


        $("#form-work").validate();
        /* Forms Validation ids */
        $('#super-admin-add-admin-form').validate();


        //Back Button
        $('.back-btn').on('click', function() {
            history.go(-1);
        });
    });

 })(window.jQuery);

 //Generic Function to Show ALert
 var showAlert = function(obj) {
    $("#ajaxModalTitle").html(obj.heading || '');
    if(obj.heading == undefined || obj.heading == ''){
        $("#ajaxModalTitle").addClass('noHeading');
    }else{
        $("#ajaxModalTitle").removeClass('noHeading');
    }
    $("#ajaxModalContent").html('<div class="modal-body text-center">' + obj.data + '</div>');
    $("#ajaxModal").modal('show');
 }

 var showLoader = function(elem) {
    elem.after('<img class="image-responsive-height demo-mw-50" id="loader-img" src="/img/demo/progress.svg" alt="Progress">');
    elem.hide();
 }

 var hideLoader = function(elem) {
    elem.show();
    elem.parent().find('#loader-img').remove();
 }

 var log = function(msg) {
    console.log(msg);
 }

 //Time SInce 
 var timeSince = function(date) {
    var seconds = Math.floor((new Date() - new Date(Date.parse(date))) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
 };

 function CreatLineGraphPost(lineIDDataAll, lineIds, containerID, isEditable, labelEnabled,currency) {
    var self = this;
    var seriesData = [];
    var lineIds = lineIds.split("*");
    for (var l = 0; l < lineIds.length; l++) {
        var lineIDData = lineIDDataAll[lineIds[l]];
        var cells = lineIDData.cells;
        var xAxisArr = [];
        var yAxisArr = [];
        var totalDot = 0;
        var title = lineIDData.Title;
        var formatTooltip = '{value}';
        var unit1 = lineIDData.Unit1;
        var unit2 = lineIDData.Unit2;
        var unit = "";
        var isPer = false;
        var units = "";
        if(currency){
            units = getUnit(unit1 ,unit2,currency);
        }
        if(units.indexOf("%") > -1){
            formatTooltip = '{value}%';
        }
       


        yAxisObj = [];
        for (var year in cells) {
            if (cells.hasOwnProperty(year) && cells[year] !== "") {
                xAxisArr.push(year);
                if (cells[year].value == "") {
                    cells[year].value = 0;
                }
                var y = parseFloat(parseFloat(cells[year].value).toFixed(2));

                if(units.indexOf("%") > -1){
                    y = y * 100;

                }
                yAxisArr.push(y);

            }
        }
        // to be removed in next phase-> items must be ingnored during year loop
        var addedCount = 0;
        for (var indexYr = yAxisArr.length - 1; indexYr >= 0; indexYr--) {
            if(addedCount >= 10){
                yAxisArr.splice(indexYr, 1);
                xAxisArr.splice(indexYr, 1);
            }
            addedCount++;
        }
        yAxisObj.push({
            title: {
                text: units.replace(/%/ig,'percentage')
            }

        });
        seriesData.push({
            name: lineIDData.Title,
            type: 'line',
            data: yAxisArr,

            zoneAxis: 'x'
        });
    }
    //line chart
    var options = {

        chart: {
            renderTo: containerID,
            animation: true
        },

        title: {
            text: ''
        },

        yAxis: yAxisObj,

        xAxis: {
            categories: xAxisArr
        },

        tooltip: {
            yDecimals: 2,
            formatter: function() {
                if(units.indexOf("%") > -1){
                    return this.x + '</b> : <b>' + parseFloat(this.y).toFixed(2) + '%';
                }
                else{
                    return this.x + '</b> : <b>' + parseFloat(this.y).toFixed(2);
                }
                    
            }
        },


        series: seriesData

    };
    if (isEditable && isEditable == true) {
        editableChart = new Highcharts.Chart(options);
    } else {

        lineChart = new Highcharts.Chart(options);
    }

 };

 //custom dialog
 $(document).ready(function(argument) {
    $.ajaxSetup({
        cache: false
    });
    //Message Modal
    $('body').on('click', '[data-act=message-modal]', function() {
        var isLargeModal = $(this).attr('data-modal-lg'),
            title = $(this).attr('data-title'),
            content = $(this).attr('data-content');
        if (isLargeModal === "1") {
            $("#ajaxModal").find(".modal-dialog").addClass("modal-lg");
        }
        if (title) {
            $("#ajaxModalTitle").html(title);
        } else {
            $("#ajaxModalTitle").html($("#ajaxModalTitle").attr('data-title'));
        }
        if (content) {
            $("#ajaxModalContent").html('<div class="modal-body text-center">' + content + '</div>');
        } else {
            $("#ajaxModalContent").html('');
        }
        $("#ajaxModal").modal('show');
    });

    $('body').on('click', '[data-act=ajax-modal]', function() {
        var data = {
                ajaxModal: 1
            },
            url = $(this).attr('data-action-url'),
            isLargeModal = $(this).attr('data-modal-lg'),
            callback = $(this).attr("data-callback"),
            title = $(this).attr('data-title'),
            method = $(this).attr('data-ajax-method');

        if (!url) {
            console.log('Ajax Modal: Set data-action-url!');
            return false;
        }
        if (title) {
            $("#ajaxModalTitle").html(title);
        } else {
            $("#ajaxModalTitle").html($("#ajaxModalTitle").attr('data-title'));
        }

        $("#ajaxModalContent").html($("#ajaxModalOriginalContent").html());
        $("#ajaxModalContent").find(".original-modal-body").removeClass("original-modal-body").addClass("modal-body");
        $("#ajaxModal").modal('show');

        $(this).each(function() {
            $.each(this.attributes, function() {
                if (this.specified && this.name.match("^data-post-")) {
                    var dataName = this.name.replace("data-post-", "");
                    data[dataName] = this.value;
                }
            });
        });
        ajaxModalXhr = $.ajax({
            url: url,
            data: data,
            cache: false,
            type: method || 'POST',
            success: function(response) {
                $("#ajaxModal").find(".modal-dialog").removeClass("mini-modal");
                if (isLargeModal === "1") {
                    $("#ajaxModal").find(".modal-dialog").addClass("modal-lg");
                }
                var renderedData = new EJS({
                    url: '/' + response.pageName + '.ejs'
                }).render({
                    data: response,
                    res: response.data,
                    imgUrl: response.imgUrl
                });


                $("#ajaxModalContent").html(renderedData);

                if (callback && typeof callback == 'function') {
                    callback();
                }
                var $scroll = $("#ajaxModalContent").find(".modal-body"),
                    height = $scroll.height(),
                    maxHeight = $(window).height() - 200;
                if (height > maxHeight) {
                    height = maxHeight;
                    $scroll.scrollbar({
                        alwaysVisible: true,
                        height: height + "px",
                        color: "#98a6ad",
                        borderRadius: "0"
                    });
                }
            },
            statusCode: {
                404: function() {
                    $("#ajaxModalContent").find('.modal-body').html("");
                    //  appAlert.error("404: Page not found.", {container: '.modal-body', animate: false});
                }
            },
            error: function() {
                $("#ajaxModalContent").find('.modal-body').html("");
                //appAlert.error("500: Internal Server Error.", {container: '.modal-body', animate: false});
            }
        });
        return false;
    });

    //abort ajax request on modal close.
    $('#ajaxModal').on('hidden.bs.modal', function(e) {
        ajaxModalXhr.abort();
        $("#ajaxModal").find(".modal-dialog").removeClass("modal-lg");
        $("#ajaxModal").find(".modal-dialog").addClass("mini-modal");

        $("#ajaxModalContent").html("");
    });
    //common ajax request
    $('body').on('click', '[data-act=ajax-request]', function() {
        var data = {},
            $selector = $(this),
            url = $selector.attr('data-action-url'),
            removeOnSuccess = $selector.attr('data-remove-on-success'),
            removeOnClick = $selector.attr('data-remove-on-click'),
            inlineLoader = $selector.attr('data-inline-loader'),
            reloadOnSuccess = $selector.attr('data-reload-on-success');
        var callback = $selector.attr('data-action-callback');

        var $target = "";
        if ($selector.attr('data-real-target')) {
            $target = $($selector.attr('data-real-target'));
        } else if ($selector.attr('data-closest-target')) {
            $target = $selector.closest($selector.attr('data-closest-target'));
        }

        if (!url) {
            console.log('Ajax Request: Set data-action-url!');
            return false;
        }

        if (removeOnClick) {
            $(removeOnClick).remove();
        }

        $selector.each(function() {
            $.each(this.attributes, function() {
                if (this.specified && this.name.match("^data-post-")) {
                    var dataName = this.name.replace("data-post-", "");
                    data[dataName] = this.value;
                }
            });
        });
        if (inlineLoader === "1") {
            $selector.addClass("inline-loader");
        } else {
            //appLoader.show();
        }

        ajaxRequestXhr = $.ajax({
            url: url,
            data: data,
            cache: false,
            type: 'POST',
            success: function(response) {
                $selector.removeClass("inline-loader");
                if (reloadOnSuccess) {
                    location.reload();
                }
                if (removeOnSuccess) {
                    $(removeOnSuccess).remove();
                }
                //appLoader.hide();
                if ($target.length) {
                    $target.html(response);
                }
                if (callback) {
                    var f = eval(callback);
                    f(response,$selector);
                }
                //eval(callback(response);
            },
            statusCode: {
                404: function() {
                    //appLoader.hide();
                    //appAlert.error("404: Page not found.");
                }
            },
            error: function() {
                //appLoader.hide();
                //appAlert.error("500: Internal Server Error.");
            }
        });

    });
    //custom app form controller
    (function($) {
        $.fn.appForm = function(options) {
            var defaults = {
                ajaxSubmit: true,
                isModal: true,
                dataType: "json",
                onModalClose: function() {},
                onSuccess: function() {},
                onError: function() {
                    return true;
                },
                onSubmit: function() {},
                onAjaxSuccess: function() {},
                beforeAjaxSubmit: function(data, self, options) {}
            };

            var settings = $.extend({}, defaults, options);
            this.each(function() {
                if (settings.ajaxSubmit) {
                    validateForm($(this), function(form) {
                        if(settings.onSubmit($(form)) == false){
                            return false ; 
                        }
                        if (settings.isModal) {
                            maskModal($("#ajaxModalContent").find(".modal-body"));
                        }
                        $(form).ajaxSubmit({
                            dataType: settings.dataType,
                            beforeSubmit: function(data, self, options) {
                                settings.beforeAjaxSubmit(data, self, options);
                            },
                            success: function(result) {
                                settings.onAjaxSuccess(result,$(form));

                                if (result.success) {
                                    settings.onSuccess(result);
                                    if (settings.isModal) {
                                        closeAjaxModal(true);
                                    }
                                } else {
                                    if (settings.onError(result)) {
                                        if (settings.isModal) {
                                            unmaskModal();
                                            if (result.message) {
                                                //appAlert.error(result.message, {container: '.modal-body', animate: false});
                                            }
                                        } else if (result.message) {
                                            //appAlert.error(result.message);
                                        }
                                    }
                                }
                            }
                        });
                    });
                } else {
                    validateForm($(this));
                }
            });
            /*
             * @form : the form we want to validate;
             * @customSubmit : execute custom js function insted of form submission. 
             * don't pass the 2nd parameter for regular form submission
             */
            function validateForm(form, customSubmit) {
                //add custom method
                $.validator.addMethod("greaterThanOrEqual",
                    function(value, element, params) {
                        var paramsVal = params;
                        if (params && (params.indexOf("#") === 0 || params.indexOf(".") === 0)) {
                            paramsVal = $(params).val();
                        }
                        if (!/Invalid|NaN/.test(new Date(value))) {
                            return new Date(value) >= new Date(paramsVal);
                        }
                        return isNaN(value) && isNaN(paramsVal) ||
                            (Number(value) >= Number(paramsVal));
                    }, 'Must be greater than {0}.');
                $(form).validate({
                    submitHandler: function(form) {
                        if (customSubmit) {
                            customSubmit(form);
                        } else {
                            return true;
                        }
                    },
                    highlight: function(element) {
                        $(element).closest('.form-group').addClass('has-error');
                    },
                    unhighlight: function(element) {
                        $(element).closest('.form-group').removeClass('has-error');
                    },
                    errorElement: 'span',
                    errorClass: 'help-block',
                    ignore: ":hidden:not(.validate-hidden)",
                    errorPlacement: function(error, element) {
                        if (element.parent('.input-group').length) {
                            error.insertAfter(element.parent());
                        } else {
                            error.insertAfter(element);
                        }
                    }
                });
                //handeling the hidden field validation like select2
                $(".validate-hidden").click(function() {
                    $(this).closest('.form-group').removeClass('has-error').find(".help-block").hide();
                });
            }

            //show loadig mask on modal before form submission;
            function maskModal($maskTarget) {
                var padding = $maskTarget.height() - 80;
                if (padding > 0) {
                    padding = Math.floor(padding / 2);
                }
                $maskTarget.append("<div class='modal-mask'><div class='circle-loader'></div></div>");
                //check scrollbar
                var height = $maskTarget.height();
                var $slimScrollDiv = $maskTarget.closest(".modal-content").find(".slimScrollDiv");
                if ($slimScrollDiv.length && $slimScrollDiv.find(".modal-body").length) {
                    height = 20000;
                    $slimScrollDiv.removeClass("slimScrollDiv").addClass("slimScrollDiv-deleted");
                    $maskTarget.closest(".modal-content").find(".slimScrollBar").css({
                        "z-index": "-1"
                    });
                }
                $('.modal-mask').css({
                    "width": $maskTarget.width() + 30 + "px",
                    "height": height + "px",
                    "padding-top": padding + "px"
                });
                $maskTarget.closest('.modal-dialog').find('[type="submit"]').attr('disabled', 'disabled');
            }

            //remove loadig mask from modal
            function unmaskModal() {
                var $maskTarget = $(".modal-body");
                $maskTarget.closest('.modal-dialog').find('[type="submit"]').removeAttr('disabled');
                $maskTarget.closest(".modal-content").find(".slimScrollDiv-deleted").removeClass("slimScrollDiv-deleted").addClass("slimScrollDiv");
                $maskTarget.closest(".modal-content").find(".slimScrollBar").css({
                    "z-index": "auto"
                });
                $(".modal-mask").remove();
            }

            //colse ajax modal and show success check mark
            function closeAjaxModal(success) {
                if (success) {
                    $(".modal-mask").html("<div class='circle-done'><i class='fa fa-check'></i></div>");
                    setTimeout(function() {
                        $(".modal-mask").find('.circle-done').addClass('ok');
                    }, 30);
                }
                setTimeout(function() {
                    $(".modal-mask").remove();
                    $("#ajaxModal").modal('toggle');
                    settings.onModalClose();
                }, 1000);
            }
        };
    })(jQuery);


    /*
        Show Temp Image |Preview after select file|
    */
    $('body').on('change', '[data-act=img-preview]', function() {
        var input = this;
        var previewElem = $(this).data('target');
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $(previewElem)
                    .attr('src', e.target.result);

            };

            reader.readAsDataURL(input.files[0]);
        }
    });

    //Show full bubble post
    $(document).on('click','.click-to-show',function(){
        $chartElm = $(this).closest('.timeline-content');
        
        $(this).closest('.timeline-content').find('.show-on-click').toggle(400);
        var id = $(this).attr('data-chart');
        var currency = $(this).attr('data-currency');
        var stat_json = JSON.parse($('#stat-json-'+id).html());
        setTimeout(function() {
            CreatLineGraphPost(stat_json,'100031',"rev-"+id,false,false,currency);
            CreatLineGraphPost(stat_json,'100032',"margin-"+id,false,false,currency);
            CreatLineGraphPost(stat_json,'100030',"eps-"+id,false,false,currency);
        }, 500)

    });
})

 /*
 |
 ||||Get Elements Ajax Function||||
 |
 |   data => to be passed,
 |   actUrl => url to which req is sent for data
 |   divElem => element that is to be apended,
 |   page => page name respect to ajax folder in views to be rendered with data
 |
 */
 var getElemView = function(postData, actUrl, divElem, page,cb,type) {
    var $elem = $(divElem);

    $.ajax({
        url: actUrl,
        data: postData,
        type: 'POST',
        success: function(data) {
      
            if (data.status) {
                var callback = new EJS({
                    url: page
                }).render({
                    data: data.data,
                    res: data,
                    imgUrl: imgUrl
                });
                if(type == undefined){
                    $elem.append(callback);
                }else if(type == 'html'){
                    $elem.html(callback);
                }
                if (cb) {
                    cb(data);
                }
            }

        },
        error: function(err) {
           
            if (cb) {
                cb(undefined);
            }
            console.error(err);
        }
    });
 }

 $(document).ready(function() {
    $('#notification-center').on('click', function() {
        $("#notification-center>.bubble").hide();
        $('#notification-list').html('');
        var data = true;
        getElemView(data, '/admin-common/get-notifications', '#notification-list', '/notification_list.ejs');
    });

    $('#user-notification-center').on('click', function() {
        $("#user-notification-center>.bubble").hide();
        $('#user-notification-list').html('');
        var data = true;
        getElemView(data, '/user/get-notifications', '#user-notification-list', '/user_notification_list.ejs');
    });
 });

$(document).on("click",".clickable-element",function(event) {
    if ($(this).data("href") == undefined)
        return false;
    if ($(this).attr('target') == '_blank')
        window.open($(this).data("href"), '_blank');
    else
        window.document.location = $(this).data("href");

});
 function updateFollowerCount(response) {
    var count = parseInt($('#follow-count').text());
    if (response == 'Follow') {
        $('#follow-count').text(count - 1);
    } else if (response == 'Unfollow') {
        $('#follow-count').text(count + 1);
    }
 }

function updateCommunityMemberCount(response){
    var count = parseInt($('#count-community-member').text());
    $('#count-community-member').text(count + response.count);
}

function initComment(container){

    var $container = $(container);
    var itemid = $container.attr('data-id');
    var $countDiv = $($container.attr('data-countdiv'));
    var profileUrl = $container.attr('data-profileUrl');
    $container.comments({
        sendText: 'Post',
        profilePictureURL: profileUrl,
        timeFormatter: function(time) {
            return moment(time).fromNow();
        },
        roundProfilePictures: true,
        enableDeletingCommentWithReplies: false,
        postCommentOnEnter: true,
        postComment: function(commentJSON, success, error) {
            $.ajax({
                type: 'post',
                url: '/user/post-comment/'+itemid,
                data: commentJSON,
                success: function(comment) {
                    try{
                        $countDiv.text(parseInt($countDiv.text())+1);
                        success(comment);
                    }catch(e){
                        console.log(e);
                    }
                },
                error: error
            });
        },
        putComment: function(commentJSON, success, error) {
            $.ajax({
                type: 'post',
                url: '/user/edit-comment/' + itemid + '/' + commentJSON.id,
                data: commentJSON,
                success: function(comment) {
                    try{
                        success(comment);
                    }catch(e){
                        console.log(e);
                    }
                },
                error: error
            });
        },
        getComments: function(success, error) {
            $.ajax({
                type: 'get',
                url: '/user/get-comment/' + itemid, 
                success: function(commentsArray) {
                    try{
                        success(commentsArray);
                    }catch(e){
                        console.log(e);
                    }
                },
                error: error
            });
        },
        deleteComment: function(commentJSON, success, error) {
            $.ajax({
                type: 'delete',
                url: '/user/delete-comment/'+ itemid + '/' + commentJSON.id,
                success: success,
                error: error
            });
            try{
                $countDiv.text(parseInt($countDiv.text())-1);
            }catch(e){

            }
        },
        upvoteComment: function(commentJSON, success, error) {
            var upvotesURL = '/user/like-comment/' + commentJSON.id;

            if(commentJSON.userHasUpvoted) {
                $.ajax({
                    type: 'post',
                    url: upvotesURL,
                    data: {
                        comment: commentJSON.id
                    },
                    success: function() {
                        success(commentJSON)
                    },
                    error: error
                });
            } else {
                $.ajax({
                    type: 'post',
                    url: upvotesURL,
                    data: {
                        comment: commentJSON.id
                    },
                    success: function() {
                        success(commentJSON)
                    },
                    error: error
                });
            }
        }
    });
}

//Update Conversation View
var getConversation = function(view, animation,bthis){
    var $elm = $(bthis);
    $('#friend-name').html($elm.attr('data-fname'));
    $('#my-conversation').html('');
    $('#my-conversation').addClass('circle-loader');
    $('#send-msg-btn').attr('data-friendid',$elm.attr('data-friendid'));
    // check if user is friend
    if($elm.attr('data-fstatus') == '0'){
        $('#send-msg-btn').attr('disabled','disabled');
        return false;
    }else{
        $('#send-msg-btn').removeAttr('disabled');
    }
    var data = {
        friend_id: $elm.attr('data-friendid'),
        user_id : $elm.attr('data-userid'),
        fimage : $elm.attr('data-fimage'),
        fname : $elm.attr('data-fname')
    };
    getElemView(data,'/user/get-message','#my-conversation','/chat_conversation',function(){
        $('#my-conversation').scrollTop($('#my-conversation')[0].scrollHeight);
        $('#my-conversation').removeClass('circle-loader');
    });
}

//Send Message
var sendConversation = function(obj){
    $.ajax({
        url: '/user/send-message',
        data: {
            'message': obj.message,
            'id': obj.f_id
        },
        type: 'POST',
        success: function(data) {
            
        },
        error: function(err) {
            console.error(err);
        }
    });
}

//Update Chat status
var updateChatStatus = function(param,bthis){
    bthis.closest('p').find('a.friend-item').attr('data-fstatus',1);
    bthis.remove();
}

//Save VFM on ctr -s 
document.addEventListener("keydown", function(e) {
  if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    if($('.save-vfm'))$('.save-vfm').click();    
  }
}, false);

// resize handler
/*$(document).ready(resizeBfmHeader);
$(window).resize(resizeBfmHeader);

 function resizeBfmHeader(){
    //var ht = $(".ddNav").outerHeight();
    //$("BFM_container").css("margin-top",(ht+60)+"px");
  
}*/
var stdev = function(arr) {
    var n = arr.length;
    var sum = 0;

    arr.map(function(data) {
        sum+=data;
    });

    var mean = sum / n;

    var variance = 0.0;
    var v1 = 0.0;
    var v2 = 0.0;

    if (n != 1) {
        for (var i = 0; i<n; i++) {
            v1 = v1 + (arr[i] - mean) * (arr[i] - mean);
        }

        
        variance = v1/n;
        if (variance < 0) { variance = 0; }
        stddev = Math.sqrt(variance);
    }

    return {
        mean: Math.round(mean*100)/100,
        deviation: stddev
    };
};

$(document).ready(function(){
    pagination();
    //Bind event for search icon
    $(document).on('click','.submit-element',function(){
        $(this).closest('form').submit();
    })
});

function pagination(){
    var pagination = $('#pagination');
    var url = pagination.data('url');
    var limit = pagination.data('limit');
    var page = pagination.data('page');
    var count = pagination.data('count');
    var sortBy = pagination.data('sortby');
    var sortOrder = pagination.data('sortorder');
    var pagesCount = count/limit;
    pagesCount = String(pagesCount).split('.');
    pagesCount = parseInt(pagesCount[0]);
    if(count % limit == 0){
        pagesCount--;
    }
//    pagination.append("<h6>Total Count : "+count+"</h6>");
    if(count > 0){
        if(page != 0){
            pagination.append("<a href='"+url+"/"+limit+"/0/"+sortBy+"/"+sortOrder+"'>First</a>");
            pagination.append("<a href='"+url+"/"+limit+"/"+(page-1)+"/"+sortBy+"/"+sortOrder+"'>Prev</a>");
        }
        for(i=((page-2)<0 ? 0 : (page-2));i< (((page+5) > pagesCount) ? pagesCount : (page+5));i++){
            if(page <= pagesCount){
                pagination.append("<a class='"+((page == i)? 'block-click' : '')+"' href='"+url+"/"+limit+"/"+i+"/"+sortBy+"/"+sortOrder+"'>"+(i+1)+"</a>");
            }
        }
        if(page != pagesCount){
            pagination.append("<a href='"+url+"/"+limit+"/"+(page+1)+"/"+sortBy+"/"+sortOrder+"'>Next</a>");
            pagination.append("<a href='"+url+"/"+limit+"/"+(pagesCount)+"/"+sortBy+"/"+sortOrder+"'>Last</a>");
        }else if(pagesCount == 0){
            pagination.append("<a class='block-click'>First</a>");
        }else if(page == pagesCount){
            pagination.append("<a class='block-click'>Last</a>");
        }
    }
}
