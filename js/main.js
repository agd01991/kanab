new Vue({
    el: '.container',
    data: {
        inputvalue: '',
        namevalue: '',
        whois: '',
        themedark: false,
        Hour1: '',
        Hour2: '',
        Minutes1: '',
        Minutes2: '',
        Seconds1: '',
        Seconds2: '',
        secondid: '',
        seconddesc: '',
        seconddatestart: '',
        h: '',
        m: '',
        s: '',
        status: '',
        plans: [{
            id: '',
            description: '',
            status: '',

        }],
        inwork: [{
            id: '',
            description: '',
            datestart: '',
            pesponsable: '',
            status: '',

        }],
        completed: [{
            id: '',
            description: '',
            datestart: '',
            dateend: '',
            responsable: '',
            during: '',
            status: '',
        }],
        nextid: 1,
        countplans: 1,
        countwork: 1,
        countstop: 1,
    },
    methods: {
        avtor: function (param) {
            if ((this.namevalue == '')) {
                alert('Введите имя!')
                return
            } else {
                $('.avtor').css({
                    'display': 'none'
                })
            }
        },
        theme: function () {
            console.log('theme')
            if (flag) {
                $('.plans').css({
                    'background-color': 'rgba(255, 255, 255)'
                })
            }
            console.log('проверка темы ')
            $('.plans').css({
                'background-color': 'blue;'
            })
        },
        add: function () {
            if ((this.inputvalue == '')) {
                alert('Введите описание задачи')
                return
            }
            this.plans.push({
                id: this.nextid++,
                description: this.inputvalue,
            })
            this.inputvalue = ''
        },


        next1: function (e) {
            var numberTask = $(e.target).closest('li').find('.number').text()
            var description = $(e.target).closest('li').find('.desc').text()
            this.plans.pop({
                id: numberTask,
            });
            Data1 = new Date();
            this.Hour1 = Data1.getHours();
            this.Minutes1 = Data1.getMinutes();
            this.Seconds1 = Data1.getSeconds();
            this.inwork.push({
                id: numberTask,
                description: description,
                datestart: new Date(),
                responsable: this.namevalue,
            })
        },
        next2: function (e) {
            var numberTask = $(e.target).closest('li').find('.number').text()
            var description = $(e.target).closest('li').find('.desc').text()
            var datestart = $(e.target).closest('li').find('.date').text()
            this.inwork.pop({
                id: numberTask,
            });
            Data2 = new Date();
            this.Hour2 = Data2.getHours();
            this.Minutes2 = Data2.getMinutes();
            this.Seconds2 = Data2.getSeconds();
            //var h;
            if ((this.Hour2 - this.Hour1) < 9) {
                this.h = '0' + (this.Hour2 - this.Hour1)
            }
            var m;
            if ((this.Minutes2 - this.Minutes1) < 9) {
                this.m = '0' + (this.Minutes2 - this.Minutes1)
            }
            var s;
            if ((this.Seconds2 - this.Seconds1) < 9) {
                this.s = '0' + (this.Seconds2 - this.Seconds1)
            }
            this.completed.push({
                id: numberTask,
                description: description,
                datestart: datestart,
                dateend: new Date(),
                responsable: this.namevalue,
                during: this.h + ':' + this.m + ':' + this.s,
            })
        },
        del: function (e) {
            var numberTask = $(e.target).closest('li').find('.number').text()
            this.completed.pop({
                id: numberTask,
            });
        },
        edit: function (e) {
            console.log($(e.target).closest('.check').attr('class'))
            if ($(e.target).closest('.check').attr('class') == "main__plans check") {
                $('.editplans').css({
                    'display': 'block',
                })
                var desc = $(e.target).closest('li').find('.desc').text()
                $('#description1').val(desc)
                $('select option[value="1"]').prop('selected', true);
                console.log('edit1')
            }
            if ($(e.target).closest('.check').attr('class') == "main__inwork check") {
                $('.editinwork').css({
                    'display': 'block',
                })
                var desc = $(e.target).closest('li').find('.desc').text()
                var date = $(e.target).closest('li').find('.date').text()
                var respons = $(e.target).closest('li').find('.respons').text()
                $('#description2').val(desc)
                $('#date2').val(date)
                $('#respons2').val(respons)
                $('select option[value="2"]').prop('selected', true);
                console.log('edit2')
            }
            if ($(e.target).closest('.check').attr('class') == "main__stoped check") {
                $('.editstoped').css({
                    'display': 'block',
                })
                var desc = $(e.target).closest('li').find('.desc').text()
                var date = $(e.target).closest('li').find('.date').text()
                var respons = $(e.target).closest('li').find('.respons').text()
                var dateend = $(e.target).closest('li').find('.dateend').text()
                $('#description3').val(desc)
                $('#date3').val(date)
                $('#respons3').val(respons)
                $('#dateend3').val(dateend)
                //select
                $('select option[value="3"]').prop('selected', true);
                console.log('edit3')
            }
            this.whois = $(e.target)
        },
        close: function () {
            $('.editinwork, .editstoped, .editplans').css({
                'display': 'none',
            })
        },
        savechanges: function (e) {
            if ($(e.target).closest('.check2').attr('class') == 'editplans check2') {
                var descChanges = $('#description1').val()
                var selectChanges = $("#select1 option:selected").text();
                this.whois.closest('li').find('.desc').text(descChanges)
                //select
                if (selectChanges == 'В работе') {
                    var numberTask = this.whois.closest('li').find('.number').text()
                    var description = this.whois.closest('li').find('.desc').text()
                    this.plans.pop({
                        id: numberTask,
                    });
                    this.inwork.push({
                        id: numberTask,
                        description: description,
                        datestart: new Date(),
                        responsable: this.namevalue,
                    })
                }
                if (selectChanges == 'Готово') {
                    var numberTask = this.whois.closest('li').find('.number').text()
                    var description = this.whois.closest('li').find('.desc').text()
                    var datestart = this.whois.closest('li').find('.date').text()
                    this.plans.pop({
                        id: numberTask,
                    });
                    Data2 = new Date();
                    this.Hour2 = Data2.getHours();
                    this.Minutes2 = Data2.getMinutes();
                    this.Seconds2 = Data2.getSeconds();
                    //var h;
                    if ((this.Hour2 - this.Hour1) < 9) {
                        this.h = '0' + (this.Hour2 - this.Hour1)
                    }
                    var m;
                    if ((this.Minutes2 - this.Minutes1) < 9) {
                        this.m = '0' + (this.Minutes2 - this.Minutes1)
                    }
                    var s;
                    if ((this.Seconds2 - this.Seconds1) < 9) {
                        this.s = '0' + (this.Seconds2 - this.Seconds1)
                    }
                    this.completed.push({
                        id: numberTask,
                        description: description,
                        datestart: new Date(),
                        dateend: new Date(),
                        responsable: this.namevalue,
                        during: this.h + ':' + this.m + ':' + this.s,
                    })
                }
                //закрытие
                this.close()
            }
            if ($(e.target).closest('.check2').attr('class') == 'editinwork check2') {
                var descChanges = $('#description2').val()
                var selectChanges = $("#select2 option:selected").text();
                var dateChanges = $('#date2').val()
                var responsChanges = $('#respons2').val()
                this.whois.closest('li').find('.desc').text(descChanges)
                this.whois.closest('li').find('.date').text(dateChanges)
                this.whois.closest('li').find('.respons').text(responsChanges)
                //select
                if (selectChanges == 'План') {
                    var numberTask = this.whois.closest('li').find('.number').text()
                    var description = this.whois.closest('li').find('.desc').text()
                    this.inwork.pop({
                        id: numberTask,
                    });
                    this.plans.push({
                        id: numberTask,
                        description: description,
                    })
                }
                if (selectChanges == 'Готово') {
                    var numberTask = this.whois.closest('li').find('.number').text()
                    var description = this.whois.closest('li').find('.desc').text()
                    var datestart = this.whois.closest('li').find('.date').text()
                    var respons = this.whois.closest('li').find('.respons').text()
                    this.inwork.pop({
                        id: numberTask,
                    });
                    Data2 = new Date();
                    this.Hour2 = Data2.getHours();
                    this.Minutes2 = Data2.getMinutes();
                    this.Seconds2 = Data2.getSeconds();
                    //var h;
                    if ((this.Hour2 - this.Hour1) < 9) {
                        this.h = '0' + (this.Hour2 - this.Hour1)
                    }
                    var m;
                    if ((this.Minutes2 - this.Minutes1) < 9) {
                        this.m = '0' + (this.Minutes2 - this.Minutes1)
                    }
                    var s;
                    if ((this.Seconds2 - this.Seconds1) < 9) {
                        this.s = '0' + (this.Seconds2 - this.Seconds1)
                    }
                    this.completed.push({
                        id: numberTask,
                        description: description,
                        datestart: datestart,
                        dateend: new Date(),
                        responsable: respons,
                        during: this.h + ':' + this.m + ':' + this.s,
                    })
                }
                //закрытие
                this.close()
            }
            if ($(e.target).closest('.check2').attr('class') == 'editstoped check2') {
                var descChanges = $('#description3').val()
                var selectChanges = $("#select3 option:selected").text();
                var dateChanges = $('#date3').val()
                var responsChanges = $('#respons3').val()
                var dateendChanges = $('#dateend3').val()
                this.whois.closest('li').find('.desc').text(descChanges)
                this.whois.closest('li').find('.date').text(dateChanges)
                this.whois.closest('li').find('.respons').text(responsChanges)
                this.whois.closest('li').find('.dateend').text(dateendChanges)
                //select
                if (selectChanges == 'План') {
                    var numberTask = this.whois.closest('li').find('.number').text()
                    var description = this.whois.closest('li').find('.desc').text()
                    this.completed.pop({
                        id: numberTask,
                    });
                    this.plans.push({
                        id: numberTask,
                        description: description,
                    })
                }
                if (selectChanges == 'В работе') {
                    var numberTask = this.whois.closest('li').find('.number').text()
                    var description = this.whois.closest('li').find('.desc').text()
                    var respons = this.whois.closest('li').find('.respons').text()
                    var datestart = this.whois.closest('li').find('.date').text()
                    this.completed.pop({
                        id: numberTask,
                    });
                    this.inwork.push({
                        id: numberTask,
                        description: description,
                        datestart: datestart,
                        responsable: respons,
                    })
                }
                //закрытие
                this.close()
            }
        }
    }
})

var flag = false;
$(".box").click(function () {
    if (flag == false) {
        flag = true;
        $('.darktext').text('Светлая тема')
        $(".circle").removeClass('circle').addClass('circledark')
        $(".box").css({
            'background-color': 'white',
            'border': '1px solid black',
        })
        $("body").css({
            'background-color': 'black',
            'transition': 'all .8s',
            'font-family': 'Merriweather , serif'

        })
        $("h1").css({
            'color': 'blue'
        })
        $("h2").css({
            'color': 'blue',
        })
        $(".darktext").css({
            'color': 'blue'
        })
        $(".main__plans, .main__inwork , .main__stoped").css({
            'border': '1px solid blue',
            'padding': '0.7rem',
            'color': 'white',
            'background-color': 'white'
        })
        $(".p").css({
            'color': 'blue'
        })
        $(".plans").removeClass('plans').addClass('plansdark')
        $(".editplansinner").removeClass('editplansinner').addClass('editplansinnerdark')
        $(".editworkinner").removeClass('editworkinner').addClass('editworkinnerdark')
        $(".editstopedinner").removeClass('editstopedinner').addClass('editstopedinnerdark')
        $(".description").removeClass('description').addClass('descriptiondark')
    } else {
        flag = false;
        $(".editplansinnerdark").removeClass('editplansinnerdark').addClass('editplansinner')
        $(".editworkinnerdark").removeClass('editworkinnerdark').addClass('editworkinner')
        $(".editstopedinnerdark").removeClass('editstopedinnerdark').addClass('editstopedinner')
        $(".strelkadark").removeClass('strelkadark').addClass('strelka')
        $(".circledark").removeClass('circledark').addClass('circle')
        $(".box").css({
            'background-color': 'blue',
            'border': '1px solid blue',
        })
        $('.darktext').text('Темная тема')
        $("body").css({
            'background-color': 'rgb(255, 255, 255)',
            'transition': 'all .8',
            'font-family': 'Merriweather , serif'
        })
        $("h1").css({
            'color': 'black'
        })
        $("h2").css({
            'color': 'black',
        })
        $(".darktext").css({
            'color': 'black'
        })
        $(".main__plans, .main__inwork , .main__stoped").css({
            'border': '1px solid blue',
            'padding': '0.7rem',
            'color': 'white',
            'background-color': 'white'
        })
        $(".p").css({
            'color': 'blue'
        })
        $(".plansdark").removeClass('plansdark').addClass('plans')
        $(".descriptiondark").removeClass('descriptiondark').addClass('description')
    }
});


mutationObserver.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
});