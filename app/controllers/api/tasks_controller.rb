class Api::TasksController < ApplicationController
  def index
    @data = Task.all
  end

  def create
    @task = Task.create(task_params)
    render :show, status: :created
  end

  private

  def task_params
    params.require(:task).permit(:content, :status)
  end
end
