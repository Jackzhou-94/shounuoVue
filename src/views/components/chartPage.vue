<template>
    <div class="chartPage">
        <div style="display: flex;justify-content: space-around">
            <div>
                <ve-line style="width: 500px" :data="chartData"></ve-line>
            </div>
            <div>
                <ve-histogram style="width: 500px" :data="chartData"></ve-histogram>
            </div>
        </div>

        <div style="display: flex;justify-content: space-around;margin-top: 30px">
            <div>
                <ve-pie style="width: 500px" :data="chartData"></ve-pie>
            </div>
            <div>
                <ve-radar style="width: 500px" :data="chartData"></ve-radar>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "chartPage",
        data() {
            return {
                chartData: {
                    columns: ['日期', '工厂接单量', '下单用户', '下单率'],
                    rows: [
                        {'日期': '1/1', '工厂接单量': 1393, '下单用户': 1093, '下单率': 0.32},
                        {'日期': '1/2', '工厂接单量': 3530, '下单用户': 3230, '下单率': 0.26},
                        {'日期': '1/3', '工厂接单量': 2923, '下单用户': 2623, '下单率': 0.76},
                        {'日期': '1/4', '工厂接单量': 1723, '下单用户': 1423, '下单率': 0.49},
                        {'日期': '1/5', '工厂接单量': 3792, '下单用户': 3492, '下单率': 0.323},
                        {'日期': '1/6', '工厂接单量': 4593, '下单用户': 4293, '下单率': 0.78}
                    ]
                }
            }
        },

    }
</script>

<style scoped>

</style>