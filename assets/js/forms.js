$(function(){
    formSubmitInit('#consultForm');
    formSubmitInit('#contactForm');
});

function formCheck(formId){
    // #consultForm
    if(formId == '#consultForm'){
        return 1;
    }
    // #contactForm
    if(formId == '#contactForm'){
        return 1;
    }
    return false;
}

function formSubmitInit(formId){
    $(formId + ' .submit-btn').click(function(){
        if($(this).hasClass('close')){
            return true;
        }
        if(formCheck(formId)){
            $(this).css('opacity', 0.5);
            $(formId+' .msg').html('');
            formData = new FormData($(formId).get(0));
            $.ajax({
                url: "/form-submit.php?form="+$(formId).attr('id'),
                type: "POST",
                contentType: false, // важно - убираем форматирование данных по умолчанию
                processData: false, // важно - убираем преобразование строк по умолчанию
                data: formData,
                success: function(response) {
                    result = $.parseJSON(response);
                    if(result.state == 'success'){
                        if(formId == '#contactForm'){
                            popupOpen(document.getElementById('thanks-popup'));
                        } else {
                            $(formId+' .msg').html('<span style="color: #41b541; font-size: 14px; display: block; margin-top: 10px; position: absolute; font-weight: bold;">' + result.msg + '</span>');
                        }
                        $(formId).trigger('reset');
                    } else {
                        $(formId+' .msg').html('<span style="color: #d75151; font-size: 14px; display: block; margin-top: 10px; position: absolute; font-weight: bold;">' + result.msg + '</span>');
                        //$('body,html').animate({scrollTop: $(formId+' .msg'+result.type).offset().top - 50}, 400);
                    }
                    $(formId+' .submit-btn').css('opacity', 1);
                },
                error: function(response) {}
            });
            return false;
        }
        return false;
    });
}