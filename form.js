const DebtCalculator = function () {

    return {
        values: {
            currentDebt: 0,
            cancelDebt: 0,
            recoverDebt: 0,

            haciendaVirtualValue: 0,
            ssVirtualValue: 0

        },
        init: function () {
            const self = this;
            const currentDebtDisplay = document.getElementById('current-debt');
            const cancelDebtDisplay = document.getElementById('cancel-debt');
            const recoverDebtDisplay = document.getElementById('recover-debt');
            const possibleCancelPrivDisplay = document.getElementById('possible-cancel-priv');
            const possibleCancelPublicDisplay = document.getElementById('possible-cancel-public');

            const credHipInput = document.getElementById('creditos-hipotecario');
            const avalInput = document.getElementById('avales-terceros');
            const credConsInput = document.getElementById('creditos-consumoo');
            const autonomEmpresInput = document.getElementById('autonomos-empresarios');

            const haciendaInput = document.getElementById('hacienda');
            const ssInput = document.getElementById('seguridad-social');
            const otrosInput = document.getElementById('otros');

          

            const allFields = [credHipInput, avalInput, credConsInput, autonomEmpresInput, haciendaInput, ssInput, otrosInput];

            Array.from(allFields)
            .forEach(function(el){
                el.addEventListener('input', function(){
                    self.calculateHacienda(Number(haciendaInput.value));
                    self.calculateSs(Number(ssInput.value));

                    self.currentDebt = 0;
                    self.cancelDebt = 0;
                    self.recoverDebt = 0;

                    for(let i = 0; i < allFields.length; i++){
                        let field = allFields[i];
                        let fieldValue = !field.value ? 0 : field.value;
                        if(field.id !='otros'){
                            if(field.id == 'hacienda'){
                                self.cancelDebt += Number(self.haciendaVirtualValue);
                            } else {
                                self.cancelDebt += Number(fieldValue);
                            }

                        }
                        self.currentDebt += Number(fieldValue);

                    }

                    currentDebtDisplay.value = self.currentDebt;
                    cancelDebtDisplay.value = self.cancelDebt
                    recoverDebtDisplay.value = Math.round((cancelDebtDisplay.value / currentDebtDisplay.value) * 100);

                    possibleCancelPrivDisplay.value = Number(!!credHipInput.value ? credHipInput.value : 0)  + Number(!!avalInput.value ? avalInput.value : 0) + Number(!!credConsInput.value ? credConsInput.value : 0) + Number(!!autonomEmpresInput.value ? autonomEmpresInput.value : 0);
                    possibleCancelPublicDisplay.value = Number(!!self.haciendaVirtualValue ? self.haciendaVirtualValue : 0)  + Number(!!ssInput.value ? ssInput.value : 0) ; 
                });
            });

            


        },
        calculateHacienda: function (value) {
            const self = this;

            console.log(value)

            //Calculate Hacienda
            if (value <= 5000) {
                self.haciendaVirtualValue = value;
            } else if (value > 5000 && value <= 15000) {
                self.haciendaVirtualValue = 5000 + ((value - 5000) * 0.5);
            } else if (value > 15000) {
                self.haciendaVirtualValue = 10000;

            }
        },
        calculateSs: function(value){
            const self = this;
            if (value <= 5000) {
                self.ssVirtualValue = value;
            } else if (value > 5000 && value <= 15000) {
                self.ssVirtualValue = 5000 + ((value - 5000) * 0.5);
            }else if (value > 15000) {
                self.ssVirtualValue = 10000;
            }
        }
    }

}