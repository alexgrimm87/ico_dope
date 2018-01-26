/**
* Main validation form
* @param {form} jquery obj - Form
* @param {options} obj - object width params
*/
function validate(form, options){
    var setings = {
        errorFunction:null,
        submitFunction:null,
        highlightFunction:null,
        unhighlightFunction:null
    }
    $.extend(setings, options);

    var $form;
    if (form == '$(this)'){
        $form = form;
    } else {
        $form = $(form);
    }

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function(e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass : 'errorText',
            focusCleanup : true,
            focusInvalid : false,
            invalidHandler: function(event, validator) {
                if(typeof(setings.errorFunction) === 'function'){
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.closest('.subscribe__form-field, .call-popup__field'));
                setTimeout(function() {
                    $form.find('.js-btnAnim').removeClass('preload').addClass('error');
                }, 1000);
                setTimeout(function() {
                    $form.find('.js-btnAnim').removeClass('error');
                }, 3000);
            },
            highlight: function(element, errorClass, validClass) {
                setTimeout(function() {
                    $form.find('.js-btnAnim').removeClass('preload').addClass('error');
                }, 1000);
                setTimeout(function() {
                    $form.find('.js-btnAnim').removeClass('error');
                }, 3000);
                $(element).addClass('error');
                $(element).closest('.subscribe__form-field, .call-popup__field').addClass('error').removeClass('valid');
                if( typeof(setings.highlightFunction) === 'function' ) {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
                if($(element).closest('.subscribe__form-field, .call-popup__field').is('.error')){
                    $(element).closest('.subscribe__form-field, .call-popup__field').removeClass('error').addClass('valid');
                }
                if( typeof(setings.unhighlightFunction) === 'function' ) {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });

        $('[required]',$form).each(function(){
            $(this).rules( "add", {
                required: true,
                messages: {
                    required: "This field is required"
                }
            });
        });

        if($('[type="email"]',$form).length) {
            $('[type="email"]',$form).rules( "add",
            {
                messages: {
                    email: "Please enter a valid E-mail"
                 }
            });
        }

        if($('.tel-mask[required]',$form).length){
            $('.tel-mask[required]',$form).rules("add",
            {
                messages:{
                    required:"Введите номер мобильного телефона."
                }
            });
        }

        $('[type="password"]',$form).each(function(){
            if($(this).is("#re_password") == true){
                $(this).rules("add", {
                    minlength:3,
                    equalTo:"#password",
                    messages:{
                        equalTo:"Неверный пароль.",
                        minlength:"Недостаточно символов."
                    }
                });
            }
        })
    }
}


/**
* Sending form with a call popup
* @param {form} string - Form
*/
function validationCall(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
              thisForm.trigger("reset");
              thisForm.find('.js-btnAnim').addClass('preload');
              setTimeout(function() {
                thisForm.find('.js-btnAnim').removeClass('preload');
                thisForm.find('.js-btnAnim').addClass('success');
              }, 1000);
              setTimeout(function() {
                thisForm.find('.js-btnAnim').removeClass('success');
                $.fancybox.close();
                popNext("#call_success", "call-popup");
              }, 2000);
            }
            else {
               thisForm.trigger('reset');
            }
        },
        error: function () {
            $('.js-btnAnim').addClass('preload');
            setTimeout(function() {
                $('.js-btnAnim').removeClass('preload');
                $('.js-btnAnim').addClass('error');
            }, 1000);
             setTimeout(function() {
                $('.js-btnAnim').removeClass('error');
            }, 3000);
        }
    });

}


/**
* Sending form with a call popup
* @param {popupId} string - Id form, that we show
* @param {popupWrap} string - Name of class, for wrapping popup width form
*/
function popNext(popupId, popupWrap){

     $.fancybox.open({
        src  : popupId,
        type : '',
        opts : {
            baseClass: popupWrap || '',
            afterClose: function () {
                $('form').trigger("reset");
                clearTimeout(timer);
            }
        }
    });

    var timer = null;

    timer = setTimeout(function () {
        $('form').trigger("reset");
        $.fancybox.close();
    }, 2000);

}


/**
* Submitting the form with the file
* @param {form} string - Form
* не использовать input[type="file"] в форме и не забыть дописать форме enctype="multipart/form-data"
*/
function validationCallDocument(form){

    var thisForm = $(form);
    var formData = new FormData($(form)[0]);

    formData.append('file', thisForm.find('input[type=file]')[0].files[0]);

    $.ajax({
        url: thisForm.attr('action'),
        type: "POST",
        data: formData,
        contentType:false,
        processData:false,
        cache:false,
        success: function(response) {
            thisForm.trigger("reset");
            popNext("#call_success", "call-popup");
        }
    });

}


/**
* Submitting the form with the files
* @param {form} string - Form
* не использовать input[type="file"] в форме и не забыть дописать форме enctype="multipart/form-data"
*/
function validationCallDocuments(form){

    var thisForm = $(form);
    var formData = new FormData($(form)[0]);

    $.each(thisForm.find('input[type="file"]')[0].files, function(index, file){
        formData.append('file['+index+']', file);
    });

    $.ajax({
        url: thisForm.attr('action'),
        type: "POST",
        data: formData,
        contentType:false,
        processData:false,
        cache:false,
        success: function(response) {
            thisForm.trigger("reset");
            popNext("#call_success", "call-popup");
        }
    });

}


/**
* Mask on input(russian telephone)
*/
function Maskedinput(){
    if($('.tel-mask')){
        $('.tel-mask').mask('+9 (999) 999-99-99 ');
    }
}


/**
* Fansybox on form
*/
function fancyboxForm(){
    $('.fancybox-form').fancybox({
        baseClass: 'fancybox-form'
    })
}


$(document).ready(function(){

  validate('#call-popup .contact-form', {submitFunction:validationCall});
  $('.subscribe__form').each(function () {
    validate( $(this), {submitFunction:validationCall} );
  });
  $('.call-popup__form').each(function () {
    validate( $(this), {submitFunction:validationCall} );
  });
  
  Maskedinput();
  fancyboxForm();

});