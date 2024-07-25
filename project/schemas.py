from typing import Any, Dict, List, Optional, Union
from pydantic import BaseModel, EmailStr


class Success(BaseModel):
    code: int = 0
    msg: str = "Request Success"
    data: Optional[Union[List, Dict]] = None


class ExceptionRequest(BaseModel):
    code: int = 1
    msg: Optional[str] = "Request Faild"
    error: Any


class UserRegistration(BaseModel):
    username: str
    email: EmailStr
    telegram: str
    timezone: str
