<template>
  <div class="dashboard">
    <ul
      v-if="summaryStatus === 'success'"
      class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3"
    >
      <li
        v-for="boxItem in boxItems"
        :key="boxItem.title"
        :class="containerClasses(boxItem.color)"
      >
        <div>
          <NuxtButton
            :icon="boxItem.icon"
            :class="cn(
              boxItem.color,
              'rounded-full p-2'
            )"
            variant="soft"
            active
            active-variant="soft"
            active-color="primary"
            size="xl"
          />
        </div>
        <div class="text-center">
          <h2 class="text-body-sm font-[500]">
            {{ boxItem.title }}
          </h2>
          <p class="text-heading-4 font-semibold">
            {{ boxItem.value }}
          </p>
        </div>
      </li>
    </ul>
    <div
      v-else-if="summaryStatus === 'pending'"
      class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3"
    >
      <li
        v-for="n in 4"
        :key="n"
        class="rounded-2xl p-4 shadow hover:shadow-lg transition"
      >
        <div class="flex flex-col items-center justify-center gap-3">
          <NuxtSkeleton class="h-10 w-10 rounded-full mb-2" />
          <div class="text-center w-full space-y-2">
            <NuxtSkeleton class="h-4 w-3/4 mx-auto" />
            <NuxtSkeleton class="h-6 w-full mx-auto" />
          </div>
        </div>
      </li>
    </div>
    <div v-else-if="summaryStatus === 'error'">
      <NuxtAlert
        color="error"
        variant="soft"
        title="Failed to load summary data."
      />
    </div>
    <div class="grid md:grid-cols-5 items-stretch gap-5 mt-5">
      <div
        id="popular-billd"
        class="rounded-2xl shadow-lg hover:shadow-xl transition-shadow md:col-span-2 h-fit p-7"
      >
        <h6 class="text-heading-6 font-[500] my-3">
          Upcoming Bills
        </h6>
        <div v-if="upcomingBillsStatus === 'success'">
          <ul
            v-if="upcomingBills?.data?.data.length && upcomingBills?.data?.data.length > 0"
            class="space-y-3 mt-5"
          >
            <li
              v-for="bill in upcomingBills?.data?.data"
              :key="bill.id"
              class="rounded-lg p-3 bg-accented/40 hover:outline hover:outline-primary"
            >
              <NuxtLink
                :to="`/dashboard/bills/${bill.id}`"
                class="flex justify-between items-center"
              >
                <div class="flex items-center gap-3">
                  <div>
                    <p class="text-ellipsis line-clamp-1">{{ bill.name }}</p>
                    <p class="text-xs text-muted-foreground">
                      Due {{ dateTimeFormat({ date: bill.due_date }) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div>
                    <p class="text-sm text-muted-foreground">
                      Amount
                    </p>
                    <p class="font-semibold">
                      {{ currencyFormat(bill.amount, bill.currency ?? 'IDR') }}
                    </p>
                  </div>
                </div>
              </NuxtLink>
            </li>
          </ul>
          <ul v-else>
            <li class="text-center text-sm text-muted-foreground py-10">
              No upcoming bills found.
            </li>
          </ul>
        </div>
        <div v-else-if="upcomingBillsStatus === 'pending'">
          <div class="text-center py-4">
            <div class="flex flex-col gap-2">
              <NuxtSkeleton class="h-16 w-full" />
              <NuxtSkeleton class="h-16 w-full" />
              <NuxtSkeleton class="h-16 w-full" />
            </div>
          </div>
        </div>
        <div v-else-if="upcomingBillsStatus === 'error'">
          <NuxtAlert
            color="error"
            variant="soft"
            title="Failed to load upcoming bills."
          />
        </div>
      </div>
      <div
        id="spending-breakdown"
        class="rounded-2xl shadow-lg hover:shadow-xl transition-shadow md:col-span-3 min-h-32 p-7 max-w-full overflow-auto"
      >
        <h4 class="text-heading-6 font-[500] mb-5">
          Spending Breakdown by Category
        </h4>
        <div
          v-if="spendingByCategoryStatus === 'pending'"
          class="h-[200px] flex items-center justify-center"
        >
          <NuxtIcon
            name="i-heroicons-arrow-path"
            class="text-2xl animate-spin"
          />
        </div>
        <div
          v-else-if="spendingByCategoryStatus === 'error'"
          class="h-[200px] flex items-center justify-center"
        >
          <NuxtAlert
            color="error"
            variant="soft"
            title="Failed to load chart data."
          />
        </div>
        <div
          v-else
          class="flex items-center gap-5"
        >
          <v-chart
            class="chart h-[200px]!"
            :option="
              pieChartData.length > 0
                ? pieChartOption
                : noDataPieChartOption"
            autoresize
          />
          <div class="legend-container">
            <div
              v-for="(item, index) in legendData"
              :key="index"
              class="legend-item"
            >
              <span
                class="legend-dot"
                :style="{ backgroundColor: item.color }"
              />
              <span class="legend-name">{{ item.name }}</span>
              <span class="legend-percentage">{{ item.value }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid md:grid-cols-5 items-stretch gap-5 mt-5">
      <div class="col-span-2" />
      <div class="rounded-2xl shadow-lg hover:shadow-xl transition-shadow md:col-span-3 min-h-32 p-7 max-w-full overflow-auto">
        <h4 class="text-heading-6 font-[500] mb-5">
          Monthly Spending Trend
        </h4>
        <div
          v-if="monthlyTrendStatus === 'pending'"
          class="h-[250px] flex items-center justify-center"
        >
          <NuxtIcon
            name="i-heroicons-arrow-path"
            class="text-2xl animate-spin"
          />
        </div>
        <div
          v-else-if="monthlyTrendStatus === 'error'"
          class="h-[250px] flex items-center justify-center"
        >
          <NuxtAlert
            color="error"
            variant="soft"
            title="Failed to load trend data."
          />
        </div>
        <v-chart
          v-else
          class="chart h-[250px]!"
          :option="
            monthlySpendingTrend?.data
              && monthlySpendingTrend?.data?.labels?.length > 0
              ? barChartOption
              : noDataBarChartOption"
          autoresize
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { ref, computed } from 'vue'
import { cn } from '~/utils/cn'
import dateTimeFormat from '~~/shared/utils/dateTimeFormat'
import { currencyFormat } from '~~/shared/utils/currencyFormat'

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

onMounted(() => {
  executeMonthlyTrend()
  executeSpendingByCategory()
  executeUpcomingBills()
})

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const { $useCases } = useNuxtApp()
const limit = ref(5)

const {
  data: summary,
  status: summaryStatus
} = await useAsyncData(
  'summary',
  () => $useCases.analytics.getSummary.execute({})
)

const {
  data: monthlySpendingTrend,
  status: monthlyTrendStatus,
  execute: executeMonthlyTrend
} = await useAsyncData(
  'monthly-trend',
  () => $useCases.analytics.getMonthlySpendingTrend.execute({}),
  {
    immediate: false
  }
)

const {
  data: spendingByCategory,
  status: spendingByCategoryStatus,
  execute: executeSpendingByCategory
} = await useAsyncData(
  'spending-by-category',
  () => $useCases.analytics.getSpendingCountByCategory.execute({}),
  {
    immediate: false
  }
)

const {
  data: upcomingBills,
  status: upcomingBillsStatus,
  execute: executeUpcomingBills
} = await useAsyncData(
  'upcoming-bills',
  () => $useCases.bill.getUpcomingBills.execute({
    options: {
      query: {
        limit: limit.value
      }
    }
  }),
  {
    immediate: false
  }
)

const pieChartData = computed(() => {
  const source = spendingByCategory.value?.data
  if (!source || !source.labels || source.labels.length === 0) {
    return []
  }
  return source.labels.map((label: string, index: number) => ({
    name: label,
    value: source.totals?.[index] ?? 0
  }))
})
const legendData = computed(() => {
  const series = spendingByCategory.value?.data?.series ?? []
  return pieChartData.value.map((item, index) => {
    const colors = ['#1E88E5', '#FFA000', '#00ACC1', '#4CAF50', '#F44336']
    return {
      name: item.name,
      value: series[index] ?? 0,
      color: colors[index % colors.length]
    }
  })
})

const noDataPieChartOption = {
  title: {
    text: 'No Data Available',
    left: 'center',
    top: 'center',
    textStyle: {
      color: '#888',
      fontSize: 16
    }
  }
}
const pieChartOption = computed(() => ({
  tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
  series: [{
    type: 'pie',
    radius: ['40%', '80%'],
    avoidLabelOverlap: false,
    label: {
      show: true,
      position: 'inside',
      formatter: '{d}%',
      fontSize: 10,
      fontWeight: 'bold',
      color: '#fff'
    },
    emphasis: {
      label: {
        show: false,
        fontSize: 20,
        fontWeight: 'bold'
      }
    },
    labelLine: {
      show: false
    },
    data: pieChartData.value,
    color: ['#1E88E5', '#FFA000', '#00ACC1', '#4CAF50', '#F44336']
  }]
}))

const noDataBarChartOption = {
  title: {
    text: 'No Data Available',
    left: 'center',
    top: 'center',
    textStyle: {
      color: '#888',
      fontSize: 16
    }
  }
}
const barChartOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: {
    type: 'category',
    data: monthlySpendingTrend.value?.data?.labels ?? [],
    axisTick: { alignWithLabel: true }
  },
  yAxis: { type: 'value' },
  series: [{
    name: 'Total Spending',
    type: 'bar',
    barWidth: '60%',
    data: monthlySpendingTrend.value?.data?.totals ?? [],
    itemStyle: {
      color: '#2c3e50',
      borderRadius: [5, 5, 0, 0]
    }
  }]
}))

const boxItems = ref([
  {
    title: 'Total belum dibayar',
    value: currencyFormat(summary?.value?.data?.total_unpaid ?? 0, 'IDR'),
    icon: 'i-heroicons-currency-dollar',
    color: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'
  },
  {
    title: 'Tagihan mendatang',
    value: summary?.value?.data?.upcoming_count ?? 0,
    icon: 'i-heroicons-calendar-days',
    color: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
  },
  {
    title: 'Total tagihan',
    value: summary?.value?.data?.total_bills_this_month ?? 0,
    icon: 'i-heroicons-document-text',
    color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
  },
  {
    title: 'Terlambat bayar',
    value: summary?.value?.data?.overdue_count ?? 0,
    icon: 'i-heroicons-exclamation-triangle',
    color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300'
  }
])

const containerClasses = (color: string) => {
  return cn('flex flex-col items-center justify-center gap-3', 'rounded-2xl p-4 shadow hover:shadow-lg transition', color)
}
</script>

<style scoped>
.chart-card {
  width: 500px;
  height: 300px;
  color: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
}

.chart-title {
  font-size: 18px;
  margin-bottom: 20px;
}

.chart {
  width: 100%;
  height: 235px;
}

.legend-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-name {
  font-size: 14px;
}

.legend-percentage {
  font-weight: bold;
  font-size: 14px;
}
</style>
